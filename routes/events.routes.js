const express = require('express');
const router = express.Router();
const HistoricalEvent = require("../models/HistoricalEvent.model");
const fileUploader = require('../config/cloudinary.config');

// Ruta para obtener todos los eventos
router.get("/event-archive", (req, res, next) => {
    HistoricalEvent.find()
        .then(allEvents => {
            res.render('events/event-archive', { events: allEvents });
        })
        .catch(error => {
            next(error);
        });
});
router.get('/event-create', (req, res) => {
    res.render('events/event-create');
  
  });

// Ruta para crear un nuevo evento
router.post("/create", fileUploader.single('image'), (req, res, next) => {
    const { title, date, location, description, links, notableCharacters } = req.body;
    const image = req.file ? req.file.path : undefined;

    HistoricalEvent.create({
        title,
        date,
        location,
        description,
        links,
        image,
        notableCharacters,
    })
    .then(() => {
        
        res.locals.successMessage = 'Event created successfully';

        res.redirect('/events/event-archive');
    })
    .catch(error => {
        next(error);
    });
});


// Ruta para ver un evento específico
router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    HistoricalEvent.findById(id)
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.render('events/event-single', { event });
        })
        .catch(error => {
            next(error);
        });
});

// Ruta para editar un evento existente
router.post("/:id", fileUploader.single('image'), (req, res, next) => {
    const { id } = req.params;
    const updatedEventData = req.body;

    const image = req.file ? req.file.path : undefined;
    if (image) {
        updatedEventData.image = image;
    }

    HistoricalEvent.findByIdAndUpdate(id, updatedEventData, { new: true })
        .then(updatedEvent => {
            if (!updatedEvent) {
                return res.status(404).json({ error: "Event not found" });
            }

          
            req.flash('success', 'Event successfully updated!');
            res.redirect('/events/event-archive'); 
        })
        .catch(error => {
            next(error);
        });
});


// Ruta para eliminar un evento
router.get('/:id/delete', (req, res) => {

    const { id } = req.params;
  
    HistoricalEvent.findByIdAndDelete(id)
      .then( () => {
        res.redirect('/events/event-archive')
      });
  
  });
// router.delete("/:id", (req, res, next) => {
//     const { id } = req.params;

//     HistoricalEvent.findByIdAndDelete(id)
//         .then(deletedEvent => {
//             // Si no se encuentra el evento, devuelve un 404
//             if (!deletedEvent) {
//                 return res.status(404).json({ error: "Event not found" });
//             }
//             // res.json({ message: "Successfully deleted event" });
//             res.status(200).json({ message: "Successfully deleted event" });
//             res.redirect('events/event-archive');
//         })
//         .catch(error => {
//             next(error);
//         });
// });

module.exports = router;


