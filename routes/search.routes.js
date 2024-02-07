const express = require('express');
const router = express.Router();
const { HistoricalEvent } = require("../models/HistoricalEvent.model");

router.get("/event-results", (req, res) => {
    const query = req.query.query; 
    console.log("Query:", query);
    if (query) {
   
        HistoricalEvent.find({ $text: { $search: query } }) 
            .then(events => {
                res.render('events/event-rusults', { events });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    } else {
        HistoricalEvent.find() 
            .then(events => {
                res.render('events/event-rusults', { events });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    }
});



module.exports = router;
