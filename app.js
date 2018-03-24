var createError = require("http-errors");
var express = require("express");
var helmet = require("helmet");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var csurf = require("csurf");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var i18n = require("i18n-express");
var geolang = require("geolang-express");
var session = require("express-session");

// Define routes
var indexRouter = require("./routes/index");

// Setup express application
var app = express();

// Secure application a bit
app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setup middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true,
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);
app.use(
  geolang({
    siteLangs: ["en", "fr"],
    defaultCountry: "CA"
  })
);
app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["en", "fr"],
    textsVarName: "translation"
  })
);

// Non CSRF Protected routes here
app.use("/", indexRouter);

// Setup CSRF
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csurf({ cookie: true }));

// CSRF Protected routes here

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Catch any CSRF errors
app.use(function(err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  res.status(403);
  res.render("csrf_error");
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
