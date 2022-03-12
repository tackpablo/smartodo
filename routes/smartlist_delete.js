const express = require('express');
const router  = express.Router();

// post request for deleting task (need remove row in todos schema using id)
module.exports = (db) => {
  router.post("/", (req, res) => {
    let query = `DELETE FROM todos WHERE todos.id`;
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
