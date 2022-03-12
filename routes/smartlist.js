const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get request for loading page (all data but can be changed)
  router.get("/", (req, res) => {
    let query = `SELECT categories.*, todos.*, users.* FROM todos
    JOIN categories ON todos.category_id = categories.id
    JOIN users ON todos.user_id = users.id`;
    console.log(query);
    db.query(query)
      .then(data => {
        const todos = data.rows;
        console.log(data.rows)
        res.json({ todos });
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // post request to add a task (all data for todos schema)
  router.post("/", (req, res) => {
    let query = `INSERT INTO todos (name, category_id, user_id, important_tasks) VALUES ($1, $2, $3, $4), [properties.name, properties.category_id, properties.user_id, properties.important_tasks]`;
    console.log(query);
    db.query(query)
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

