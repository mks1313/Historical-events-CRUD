const express = require('express');
const router = express.Router();
const { HistoricalEvent, Comment, Rating }  = require("../models/HistoricalEvent.model");
const fileUploader = require('../config/cloudinary.config');
const isLoggedIn = require("../middleware/isLoggedIn");
const helpers = require('../config/helpers');

const ratingRouter = require('./rating.routes'); // Importa la nueva ruta de valoración

// Ruta para agregar valoraciones a un evento
router.use('/:id', ratingRouter);


// Ruta para obtener todos los eventos
router.get("/event-archive", isLoggedIn, (req, res, next) => {
    HistoricalEvent.find()
        .populate('creator', 'username')
        .populate('comments.author', 'username')  
        .populate('ratings.user', 'username') 
        .then(allEvents => {
            res.render('events/event-archive', { events: allEvents });
        })
        .catch(error => {
            next(error);
        });
});

router.get('/event-create', isLoggedIn, (req, res) => {
    res.render('events/event-create');
  
  });

// Ruta para crear un nuevo evento
router.post("/create", isLoggedIn, fileUploader.single('image'), (req, res, next) => {
    const { title, date, location, description, links, notableCharacters } = req.body;
    const image = req.file ? req.file.path : undefined;
    const creator = req.session.user._id;

    HistoricalEvent.create({
        title,
        date,
        location,
        description,
        links,
        image,
        notableCharacters,
        creator,
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
router.get("/:id", isLoggedIn,  (req, res, next) => {
    const { id } = req.params;

    HistoricalEvent.findById(id)
        .populate('creator', 'username')
        .populate('comments.author', 'username')  
        .populate('ratings.user', 'username') 
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            const isEventCreator = req.user && req.user._id.equals(event.creator._id);

            res.render('events/event-single', { event, isEventCreator });
        })
        .catch(error => {
            next(error);
        });
});
// Ruta para ver los comentarios de un evento
// router.get("/:id/comments", isLoggedIn, eventsController.viewEventComments);

router.post("/:id/comments", isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
    const { content, value } = req.body;
    
    // Aquí deberías obtener el userId de la sesión actual
    const userId = req.session.user._id;

    HistoricalEvent.findById(eventId)
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            // Verifica si se proporcionó contenido (comentario) y agrega el comentario al evento
            if (content) {
                event.comments.push({ author: userId, content });
            }

            return event.save();
        })
        .then(updatedEvent => {
            // Devuelve una respuesta indicando que la interacción se realizó correctamente
            // res.status(201).json({ message: "Interacción agregada correctamente", updatedEvent });
            res.locals.successMessage = 'Event UPDATED successfully';
            const rutaRedireccion = `/events/${updatedEvent._id}`;
            res.redirect(rutaRedireccion);
        })
        .catch(error => {
            next(error);
        });
});
// Ruta para agregar valoraciones a un evento
// router.post("/:id/rating", isLoggedIn, (req, res, next) => {
//     const eventId = req.params.id;
//     const { userId, value } = req.body;
    

//     HistoricalEvent.findById(eventId)
//         .then(event => {
//             if (!event) {
//                 return res.status(404).json({ error: "Event not found" });
//             }

//             // Verifica si se proporcionó valor (rating) y agrega la valoración al evento
//             if (value) {
//                 event.ratings.push({ user: userId, value });
//             }

//             return event.save();
//         })
//         .then(updatedEvent => {
//             // Devuelve una respuesta indicando que la interacción se realizó correctamente
//             res.status(201).json({ message: "Valoración agregada correctamente", updatedEvent });
//         })
//         .catch(error => {
//             next(error);
//             res.status(500).json({ error: "Internal Server Error" });
//         });
// });




// Ruta para obtener el formulario de edición de un evento
router.get('/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    HistoricalEvent.findById(id)
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.render('events/event-edit',  event );
        })
        .catch(error => {
            next(error);
        });
});

// Ruta para procesar la actualización de un evento
router.post('/:id/edit', isLoggedIn, fileUploader.single('image'), (req, res, next) => {
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
           
            res.locals.successMessage = 'Event UPDATED successfully';
            const rutaRedireccion = `/events/${updatedEvent._id}`;
            res.redirect(rutaRedireccion);
        })
        .catch(error => {
            next(error);
        });
});



// Ruta para eliminar un evento
router.get('/:id/delete', isLoggedIn, (req, res) => {

    const { id } = req.params;
  
    HistoricalEvent.findByIdAndDelete(id)
      .then( () => {
        res.locals.successMessage = 'Event DELETED successfully';
        res.redirect('/events/event-archive')
      });
  
  });

module.exports = router;

