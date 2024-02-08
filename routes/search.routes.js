const express = require('express');
const router = express.Router();
const { HistoricalEvent } = require("../models/HistoricalEvent.model");

router.get("/search-results", (req, res) => {
    const query = req.query.query; // Captura la consulta de búsqueda del parámetro de la URL

    // Realiza una búsqueda en la base de datos para eventos cuyos títulos coincidan con la consulta
    HistoricalEvent.find({ title: { $regex: query, $options: 'i' } })
        .then(events => {
            res.render('search-results', { events, query }); // Renderiza la vista con los resultados de la búsqueda
        })
        .catch(error => {
            console.error(error);
            res.render('error', { message: 'Error searching for events' });
        });
});

module.exports = router;

