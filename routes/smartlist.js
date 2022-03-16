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
    // console.log(req.body)
    const taskName = req.body.textVal.toLowerCase();
    let parsedEncodedTextVal = req.body.encodedTextVal;
    // const apiResults = req.body.apiResult;
    Promise.allSettled([movieAPI(parsedEncodedTextVal), eatAPI(parsedEncodedTextVal), booksAPI(parsedEncodedTextVal)]).then((apiResult) => {
    // console.log("apiResult", apiResult)

    // API REQUEST WITH DATA
    const parsedResults = apiResult.map((result)=> {
      if (result["status"] === "rejected" || result["value"] === undefined) {
        return {value: 0};
      } else {
        return result;
      }
    })

    // console.log("parsedResults: ", parsedResults)
    const movieLength = parsedResults[0]["value"];
    // console.log("MOVIELENGTH: ", movieLength)
    const eatLength = parsedResults[1]["value"];
    // console.log("EATLENGTH: ", eatLength)
    const booksLength = parsedResults[2]["value"];
    // console.log("BOOKSLENGTH: ", booksLength)
    const parsedArray = [Number(movieLength), Number(eatLength), Number(booksLength)];
    const maxLength = Math.max(...parsedArray);
    // console.log("maxLength: ", maxLength)
    // console.log("taskName: ", taskName)
    // console.log("apiResults: ", apiResults)
    // console.log("parsedArray: ", parsedArray)

    // pre-emptive sorting for certain words
    if ((taskName.includes('watch') && (movieLength > 0))) {
      category_id = 1;
    } else if ((taskName.includes('eat') && (eatLength > 0))) {
      category_id = 2;
    } else if ((taskName.includes('read')&& (booksLength > 0))) {
      category_id = 3;
    } else if (taskName.includes('buy')) {
      category_id = 4;
    } else if (maxLength) {
      const categoryFound = (parsedArray.indexOf(maxLength)) + 1;
      console.log("categoryFound: ",categoryFound);
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
        // console.log(todo)
        res.json({ todo });
      })
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
