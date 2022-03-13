const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get request for loading page (all data but can be changed)
  router.get("/", (req, res) => {
    let query = `SELECT todos.* FROM todos`;
    db.query(query)
      .then(data => {
        const todos = data.rows;
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
    // API REQUEST WITH DATA
    // USE TASK req.body.task to go through API
    let taskName = req.body.task;

    const todos = {
      task: req.body.task,
      category_id: 1,
      user_id: req.cookies("user_id"),
      important_tasks: false
    }

    let query = `INSERT INTO todos (task, category_id, user_id, important_tasks) VALUES ('${todos.task}', ${todos.category_id}, ${todos.user_id}, ${todos.important_tasks}) RETURNING *;`;
    console.log(query);
    db.query(query)
      .then(data => {

        const todo = data.rows[0];
        res.json({ todo });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // delete request to delete a task (all data for todos schema)
  router.delete("/:id", (req, res) => {
    let deleteId = req.params.id;
    // console.log(deleteId)
    let query = `DELETE FROM todos WHERE id = ${deleteId}`;
    // console.log(query);
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

  // post request to edit a task (change category)
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

