const express = require('express');
const router  = express.Router();

module.exports = (db) => {
 // GET request for logging a user in
 router.get("/login", (req, res) => {

  const templateVars = {
    user_id: req.cookies["user_id"]
    ? req.cookies["user_id"]
    : null,
  };
    res.render('users_login', templateVars);
  });

 // GET registering for logging a user in
 router.get("/register", (req, res) => {
   // set object where user_id is the value of the cookie where if set or null if no cookie
  const templateVars = {
    user_id: req.cookies["user_id"]
    ? req.cookies["user_id"]
    : null,
  };
    res.render('users_register', templateVars);
  });

  // POST request for logging a user in
  router.post("/login", (req, res) => {

    const user = {
      password: req.body.login_password,
      email: req.body.login_email
    }

    let query = `SELECT * FROM users WHERE users.email = $1 AND users.password = $2;`;

    db.query(query, [user.email, user.password])
    .then(data => {
      const user = data.rows[0];
      if (user === undefined) {
        res.redirect('/users/login')
      }
      res.cookie('user_id', user.id);
      res.redirect('/smartlist')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // POST request for logging a user out
  router.get("/logout", (req, res) => {
    res.clearCookie("user_id");
    res.redirect('/');
  });

   // POST request for registering a new user
   router.post("/register", (req, res) => {

    const user = {
      full_name: req.body.register_name,
      password: req.body.register_password,
      email: req.body.register_email
    }

    let query = `SELECT * FROM users WHERE users.email = $1 AND users.password = $2 AND users.full_name = $3;`;

    db.query(query, [user.email, user.password, user.full_name])
    .then(data => {
      const users = data.rows[0];
      if (!users) {
        let query = `INSERT INTO users (full_name, password, email) VALUES ($1, $2, $3) RETURNING *;`;

        db.query(query, [user.full_name, user.password, user.email])
        .then(data => {
          const users = data.rows[0];
          res.cookie('user_id', users.id);
          res.redirect('/smartlist')
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      } else {
        res.redirect('/users/login')
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
