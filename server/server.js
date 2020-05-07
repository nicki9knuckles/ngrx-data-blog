const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    secret: "SSBlog",
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

mongoose.connect("mongodb://localhost/ssblog");
mongoose.set("debug", true);

// Add models
require("./models/Entry");
// Add routes
app.use(require("./routes"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        error: err,
        message: err.message,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      error: {},
      message: err.message,
    },
  });
});

const server = app.listen(8000, () =>
  // tslint:disable-next-line:no-console
  console.log("Server started on http://localhost:8000")
);
