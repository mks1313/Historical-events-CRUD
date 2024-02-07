// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");


// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const helpers = require('./config/helpers');
hbs.registerHelper(helpers);




const app = express();
const session = require('express-session');
const flash = require('express-flash');

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "HISTORY SITE....";
const browserSync = require("browser-sync");

app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessage = ''; 
    next();
});

app.use(function(req, res, next) {
  if(req.session.currentUser) {
    res.locals.user = req.session.currentUser;
  }
  next();
})

app.use(express.static('public'));


app.locals.appTitle = `${capitalize(projectName)} Historical Events by Maksim`

if (process.env.NODE_ENV === 'development') {
browserSync({
    proxy: "http://localhost:3000", 
    files: ['public', 'views', 'views/**/*'], 
    open: false
  });
}

app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: false,
}));

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

const commentsRoutes = require("./routes/comments.routes");
app.use("/comments", commentsRoutes);

const ratingRoutes = require("./routes/rating.routes");
app.use("/rating", ratingRoutes);

const eventsRoutes = require("./routes/events.routes");
app.use("/events", eventsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
