const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // post request for logging a user in
  router.post("/login", (req, res) => {
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
    const users = {
      full_name: req.body.name,
      password: req.body.password,
      email: req.body.email
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
