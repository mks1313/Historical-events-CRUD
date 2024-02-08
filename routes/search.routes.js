const express = require("express");
const router = express.Router();
const { HistoricalEvent } = require("../models/HistoricalEvent.model");

router.get("/search-results", (req, res) => {
  const query = req.query.query;
  HistoricalEvent.find({ title: { $regex: query, $options: "i" } })
    .then((events) => {
      res.render("search-results", { events, query });
    })
    .catch((error) => {
      console.error(error);
      res.render("error", { message: "Error searching for events" });
    });
});

module.exports = router;
