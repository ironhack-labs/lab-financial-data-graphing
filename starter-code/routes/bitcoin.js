
const express = require("express");
const router = express.Router();


router.post("/api/new", (req, res) => {
  Restaurant.create(req.body).then(rest => {
    res.status(201).json(rest);
  });
});

router.get("/api/:id", (req, res) => {
  Restaurant.findById(req.params.id).then(rest => {
    res.status(200).json(rest);
  });
});

module.exports = router