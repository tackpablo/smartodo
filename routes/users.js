const express = require('express');
const router  = express.Router();

module.exports = (db) => {
 // get request for logging a user in
 router.get("/login", (req, res) => {
  const templateVars = {
    // set object where user_id is the value of the cookie and email is a ternary operator where if user exists, give email or null if no cookie
    user_id: req.cookies["user_id"]
    ? req.cookies["user_id"]
    : null,
  };
    res.render('users_login', templateVars);
  });

 // get registering for logging a user in
 router.get("/register", (req, res) => {
  const templateVars = {
    // set object where user_id is the value of the cookie and email is a ternary operator where if user exists, give email or null if no cookie
    user_id: req.cookies["user_id"]
    ? req.cookies["user_id"]
    : null,
  };
    res.render('users_register', templateVars);
  });

  // post request for logging a user in
  router.post("/login", (req, res) => {
    console.log(req.body)

    const user = {
      password: req.body.login_password,
      email: req.body.login_email
    }

    let query = `SELECT * FROM users WHERE users.email = $1 AND users.password = $2;`;

    db.query(query, [user.email, user.password])
    .then(data => {
      const user = data.rows[0];
      console.log("user: ", user)
      res.cookie('user_id', user.id);

      const templateVars = {
        // set object where user_id is the value of the cookie and email is a ternary operator where if user exists, give email or null if no cookie
        user_id: req.cookies["user_id"]
        ? req.cookies["user_id"]
        : null,
        user_email: user.email
      };
      res.render('smartlist', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // post request for logging a user out
  router.get("/logout", (req, res) => {
    res.clearCookie("user_id");
    res.redirect('/');
  });

   // post request for registering a user
   router.post("/register", (req, res) => {
    console.log(req.body)

    const users = {
      full_name: req.body.register_name,
      password: req.body.register_password,
      email: req.body.register_email
    }

    let query = `INSERT INTO users (full_name, password, email) VALUES ($1, $2, $3) RETURNING *;`;

    db.query(query, [users.full_name, users.password, users.email])
    .then(data => {
      const user = data.rows[0];
      // console.log("user: ", user)
      res.cookie('user_id', user.id);
      res.redirect('/')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
