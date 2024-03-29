const express = require("express");
const router = express.Router();
const {
  HistoricalEvent,
  Comment,
  Rating,
} = require("../models/HistoricalEvent.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedIn = require("../middleware/isLoggedIn");
const helpers = require("../config/helpers");
const secure = require("../middleware/secure");
const { calculateAverageRating } = require("../config/helpers");
const { formatDate } = require("../config/dateHelper"); 

// Ruta para obtener todos los eventos
router.get("/event-archive", secure, (req, res, next) => {
  HistoricalEvent.find()
    .populate("creator", "username")
    .populate("comments.author", "username")
    .populate("ratings.user", "username")
    .then((allEvents) => {
      const eventsWithRating = allEvents.map((event) => ({
        ...event.toObject(),
        averageRating: helpers.calculateAverageRating(event.ratings),
      }));

      res.render("events/event-archive", { events: eventsWithRating });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/event-create", isLoggedIn, (req, res) => {
  res.render("events/event-create");
});

// Ruta para ver un evento específico
router.get("/:_id", isLoggedIn, (req, res, next) => {
  const { _id } = req.params;

  HistoricalEvent.findById(_id)
    .populate("creator", "username")
    .populate("comments.author", "username")
    .populate("ratings.user", "username")

    .then((event) => {
      // console.log(event); AVERIGUAR EL ERROR, MAS TARDE
      const canEdit = event.creator._id.toString() === req.session.user._id;
      const averageRating = calculateAverageRating(event.ratings);
      const formattedDate = formatDate(event.date);

      res.render("events/event-single", { event, averageRating, canEdit, formattedDate  });
    })
    .catch((error) => {
      next(error);
    });
});

// Ruta para crear un nuevo evento
router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    const { title, date, location, description, links, notableCharacters } =
      req.body;
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
        res.redirect("/events/event-archive");
      })
      .catch((error) => {
        next(error);
      });
  }
);
// Ruta para ver los comentarios de un evento

router.post("/:id/comments", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id;
  const { content, value } = req.body;
  const userId = req.session.user._id;

  HistoricalEvent.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      if (content) {
        event.comments.push({ author: userId, content });
        // return Comment.create({ author: userId, content }); VER COMO SOLUCIONAR!!!!
      }

      return event.save();
    })
    .then((updatedEvent) => {
      res.locals.successMessage = "Event UPDATED successfully";
      const rutaRedireccion = `/events/${updatedEvent._id}`;
      res.redirect(rutaRedireccion);
    })
    .catch((error) => {
      next(error);
    });
});

//Ruta para agregar valoraciones a un evento
router.post("/:id/rating", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id;
  const { userId, value } = req.body;

  HistoricalEvent.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      if (value) {
        event.ratings.push({ user: userId, value });
      }

      return event.save();
    })
    .then((updatedEvent) => {
      res.status(201).json({ message: "Succes", updatedEvent });
    })
    .catch((error) => {
      next(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Ruta para obtener el formulario de edición de un evento
router.get("/:_id/edit", isLoggedIn, (req, res, next) => {
  const { _id } = req.params;

  HistoricalEvent.findById(_id)
    .then((event) => {
      res.render("events/event-edit", event);
    })
    .catch((error) => {
      next(error);
    });
});

// Ruta para procesar la actualización de un evento
router.post(
  "/:_id/edit",
  isLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    const { _id } = req.params;
    const updatedEventData = req.body;
    const image = req.file ? req.file.path : undefined;

    if (image) {
      updatedEventData.image = image;
    }

    HistoricalEvent.findById(_id)
      .then((event) => {
        return HistoricalEvent.findByIdAndUpdate(_id, updatedEventData, {
          new: true,
        });
      })
      .then((updatedEvent) => {
        const rutaRedireccion = `/events/${updatedEvent._id}`;
        res.redirect(rutaRedireccion);
      })
      .catch((error) => {
        next(error);
      });
  }
);

// Ruta para eliminar un evento
router.get("/:id/delete", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  HistoricalEvent.findById(id)
    .then((id) => {
      return HistoricalEvent.findByIdAndDelete(id);
    })
    .then(() => {
      res.redirect("/events/event-archive");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
