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
    // console.log("req.body: ", req.body)

    // const users = {
    //   email: req.body.login_email,
    //   password: req.body.login_password
    // }

    // console.log("users: ", users)

    // let query = `SELECT users.email, users.password FROM users WHERE email = $1 AND password = $2 RETURNING *;`;

    // db.query(query, [users.email, users.password])
    // .then(data => {
    //   const user = data.rows[0];
    //   // console.log("user: ", user);
    //   // console.log("user: ", user)
    //   res.cookie('user_id', user.email);
    //   res.redirect('/')
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // });
    res.cookie('user_id', 2);
    res.redirect('/');
  });

  // post request for logging a user out
  router.post("/logout", (req, res) => {
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
