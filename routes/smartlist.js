const express = require('express');
const router  = express.Router();


// API middleware
const {movieAPI, booksAPI, buyAPI, eatAPI} = require('../api/api')

module.exports = (db) => {
  // get request for loading page (all tasks)
  router.get("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.status(401).send("You need to log in to do that!");
      return res.redirect('/users/login');
    }

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

    if (!req.cookies["user_id"]) {
      res.status(401).send("You need to log in to do that!");
      return;
    }

    // let encodedTextVal = encodeURI(req.body.textVal);
    // Promise.all([movieAPI(encodedTextVal), eatAPI(encodedTextVal), booksAPI(encodedTextVal), buyAPI(encodedTextVal)]).then((apiResult) => {
    //   console.log(apiResult)
    //   // Making request for posting information to database via AJAX request

    // })

    // API REQUEST WITH DATA
    const taskName = req.body.textVal.toLowerCase();
    const apiResults = req.body.apiResult;
    const movieLength = apiResults[0];
    const eatLength = apiResults[1];
    const booksLength = apiResults[2];
    const buyLength = apiResults[3];
    const apiResultsNum = apiResults.map(Number)
    const maxLength = Math.max(...apiResultsNum);
    console.log("maxLength: ", maxLength)
    console.log("taskName: ", taskName)
    console.log("apiResults: ", apiResults)
    console.log("apiResultsNum: ", apiResultsNum)

    // pre-emptive sorting for certain words
    if ((taskName.includes('watch') && (movieLength > 0))) {
      category_id = 1;
    } else if ((taskName.includes('eat') && (eatLength > 0))) {
      category_id = 2;
    } else if ((taskName.includes('read')&& (booksLength > 0))) {
      category_id = 3;
    } else if ((taskName.includes('buy')&& (buyLength > 0))) {
      category_id = 4;
    } else if (maxLength) {
      const categoryFound = (apiResultsNum.indexOf(maxLength)) + 1;
      console.log("categoryFound: ",categoryFound);
      category_id = categoryFound;
    } else {
      category_id = 5;
    }

    const todos = {
      task: req.body.textVal,
      category_id: category_id,
      user_id: req.cookies.user_id,
      important_tasks: false
    }

    let query = `INSERT INTO todos (task, category_id, user_id, important_tasks) VALUES ($1, $2, $3, $4) RETURNING *;`;

    db.query(query, [todos.task, todos.category_id, todos.user_id, todos.important_tasks])
      .then(data => {
        const todo = data.rows[0];
        // console.log(todo)
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

    if (!req.cookies["user_id"]) {
      res.status(401).send("You need to log in to do that!");
      return;
    }

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
  router.put("/:id", (req, res) => {
    let editId = req.params.id;
    let category_id = req.body.category_id;
    console.log("req.body:", req.body)
    console.log("category id: ", category_id);
    //todos.category_id
    let query = `
    UPDATE todos
    SET category_id = $1
    WHERE id = $2
    `;
    console.log(query);
    db.query(query, [category_id, editId])
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
