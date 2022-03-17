// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// cookie parser for users
app.use(cookieParser());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
const smartlistRoutes = require("./routes/smartlist");
const userRoutes = require("./routes/users");

// Mount all resource routes
app.use("/api/smartlist", smartlistRoutes(db));
app.use("/users", userRoutes(db));

// Home page

app.get("/", (req, res) => {
  const templateVars = {
    user_id: req.cookies["user_id"]
    ? req.cookies["user_id"]
    : null,
  };

  res.render("index", templateVars);
});


app.get('/smartlist', (req, res) => {
  let userid = req.cookies["user_id"];
  let query = `SELECT * FROM users WHERE users.id = $1;`;

  db.query(query, [userid])
    .then(data => {
      const user = data.rows[0];
      console.log(user)

      if (user === undefined) {
        return res.redirect('/users/login');
      }

      const nameSplit = user["full_name"].split(" ");
      const firstName = nameSplit[0]
      const templateVars = {
        user_id: user.id,
        user_email: user.email,
        user_first_name: firstName
      };
      console.log(templateVars)

      return res.render('smartlist', templateVars);
    })
    .catch(err => {
      console.log(err)
      return res
        .status(500)
        .json({ error: err.message });
    });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
