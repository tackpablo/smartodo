const express = require('express');
const router  = express.Router();

// post request for changing category (need to edit category_id in categories schema)
module.exports = (db) => {
  router.post("/", (req, res) => {
    let query = `INSERT INTO todos (category_id) VALUES ($1), [todos.category_id]`;
    console.log(query);
    db.query(query)
      .then(data => {
        const category = data.rows;
        res.json({ category });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
