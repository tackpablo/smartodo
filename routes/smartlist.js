const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get request for loading page (all tasks)
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
    const taskName = req.body.task.toLowerCase();
    let category_id;

    // pre-emptive sorting for certain words
    if (taskName.includes('watch')) {
      category_id = 1;
    } else if (taskName.includes('eat')) {
      category_id = 2;
    } else if (taskName.includes('read')) {
      category_id = 3;
    } else if (taskName.includes('buy')) {
      category_id = 4;
    } else {
      category_id = 5;
    }

    const todos = {
      task: req.body.task,
      category_id: category_id,
      user_id: req.cookies.user_id,
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
  router.post("/:id", (req, res) => {
    let editId = req.params.id;
    //todos.category_id
    let query = `INSERT INTO todos (category_id) VALUES ($1) WHERE id = ${editId}, [todos.category_id]`;
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
