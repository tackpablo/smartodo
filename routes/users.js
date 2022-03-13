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
    console.log(users)
    let query = `INSERT INTO users (full_name, password, email) VALUES ('${users.full_name}', ${users.password}, ${users.email}) RETURNING *;`;

    db.query(query)
      .then(data => {
        const todo = data.rows[0];
        res.cookie('user_id', data.rows[0].id);
        res.json({ todo });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    res.redirect('/');
  });
  return router;
};
