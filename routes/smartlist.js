const express = require('express');
const router  = express.Router();


// API middleware
const {movieAPI, booksAPI, eatAPI} = require('../api/api')

module.exports = (db) => {
  // GET request for loading page
  router.get("/", (req, res) => {
    let user = req.cookies["user_id"];
    if (!user) {
      return res.redirect('/users/login');
    }

    let query = `SELECT todos.* FROM todos WHERE todos.user_id = $1;`;

    db.query(query, [user])
      .then(data => {
        const todos = data.rows;
        res.send({ todos });
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST request to add a task
  router.post("/", (req, res) => {

    if (!req.cookies["user_id"]) {
      return res.redirect('/users/login');
    }

    const taskName = req.body.textVal.toLowerCase();
    const parsedEncodedTextVal = req.body.encodedTextVal;

    // External API request calls that waits for all promies to return
    Promise.allSettled([movieAPI(parsedEncodedTextVal), eatAPI(parsedEncodedTextVal), booksAPI(parsedEncodedTextVal)]).then((apiResult) => {
      console.log("APIRESULT: ", apiResult)

    // External API request with data
    const parsedResults = apiResult.map((result)=> {
      // error handling for when promise returns no value or is rejected
      if (result["status"] === "rejected" || result["value"] === undefined) {
        return {value: 0};
      } else {
        return result;
      }
    })

    const movieLength = parsedResults[0]["value"];
    const eatLength = parsedResults[1]["value"];
    const booksLength = parsedResults[2]["value"];
    const parsedArray = [Number(movieLength), Number(eatLength), Number(booksLength)];
    const maxLength = Math.max(...parsedArray);

    // sorting algorithm
    if ((taskName.includes('watch') && (movieLength > 0))) {
      category_id = 1;
    } else if ((taskName.includes('eat') && (eatLength > 0))) {
      category_id = 2;
    } else if ((taskName.includes('read')&& (booksLength > 0))) {
      category_id = 3;
    } else if (taskName.includes('buy')) {
      category_id = 4;
    } else if (maxLength) {
      // in case of sorting via keywords + API result call (secondary check), API with most results will be category assigned
      const categoryFound = (parsedArray.indexOf(maxLength)) + 1;
      category_id = categoryFound;
    } else {
      category_id = 4;
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
        res.json({ todo });
      })
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE request to delete a task
  router.delete("/:id", (req, res) => {

    if (!req.cookies["user_id"]) {
      res.status(401).send("You need to log in to do that!");
      return;
    }

    let deleteId = req.params.id;
    let query = `DELETE FROM todos WHERE id = ${deleteId}`;
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

  // POST request to edit a task (change category)
  router.put("/:id", (req, res) => {
    let editId = req.params.id;
    let category_id = req.body.category_id;
    let query = `
    UPDATE todos
    SET category_id = $1
    WHERE id = $2
    `;
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
