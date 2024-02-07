const express = require('express');
const router = express.Router();
const { HistoricalEvent } = require("../models/HistoricalEvent.model");

router.get("/event-archive", (req, res) => {
    const query = req.query.query; 
    console.log("Query:", query);
    if (query) {
        // Si hay una consulta de búsqueda, encontrar eventos que coincidan
        HistoricalEvent.find({ $text: { $search: query } }) 
            .then(events => {
                // Renderizar la plantilla con los eventos que coinciden con la búsqueda
                res.render('events/event-archive', { events });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    } else {
        // Si no hay consulta de búsqueda, renderizar la plantilla con todos los eventos
        HistoricalEvent.find() 
            .then(events => {
                res.render('events/event-archive', { events });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    }
});



module.exports = router;
