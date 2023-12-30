const express = require("express");
const router = express.Router();
const { HistoricalEvent, Comment, Rating }  = require("../models/HistoricalEvent.model");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get('/:id/event-comments', isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
   
    HistoricalEvent.findById(eventId)
        .populate('comments.author', 'username')
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            res.render('events/event-comments', { event });
        })
        .catch(error => {
            res.status(500).json({ error: "Internal Server Error" });
        });
});


// Ruta para agregar comentarios y valoraciones a un evento
router.post("/:id/comments", isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
    const { userId, content, value } = req.body;
    
    HistoricalEvent.findById(eventId)
        .populate('comments.author', 'username') 
        // .populate('ratings.user', 'username')  
        .then(event => {

            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            if (content) {
                event.comments.push({ author: userId, content });
            }
            if (value) {
                event.ratings.push({ user: userId, value });
            }
            return event.save();
        })
        .then(updatedEvent => {
            // res.status(201).json({ message: "Interacción agregada correctamente", updatedEvent });

            req.flash('successMessage', 'Interaction added successfully');
            const rutaRedireccion = `/events/${eventId}`;
            res.redirect(rutaRedireccion);
        })
        .catch(error => {
            next(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});


module.exports = router;
