const express = require('express');
const router  = express.Router();

module.exports = () => {
  // get request for loading page (all data but can be changed)
  router.get("/login", (req, res) => {
    res.cookie('user_id', 2);
    res.redirect('/');
  });
  return router;
};
