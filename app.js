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

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "HISTORY SITE....";
const browserSync = require("browser-sync");

app.use((req, res, next) => {
    res.locals.successMessage = ''; 
    next();
});

app.locals.appTitle = `${capitalize(projectName)} Historical Events by Maksim`

browserSync({
    proxy: "http://localhost:3000", // proxying the app domain
    files: ['public', 'views', 'views/**/*'], // watching the following folders
    open: false
  });

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const eventsRoutes = require("./routes/events.routes");
app.use("/events", eventsRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);




module.exports = app;
