var express = require("express"),
    handlebars = require("express-handlebars").create({
        helpers: {
            i18n: require("./src/scripts/helpers/i18n/server")
        }
    }),
    app = express(),
    session = require("./src/scripts/session");

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// TODO: might not be ok for prod
app.set("port", process.env.PORT || 3000);

// static resource handler
app.use(express.static(__dirname + "/public"));

// app page
app.get("/", function(req, res) {
    if (req.query.lang === "fr") {
        session.language = "fr";
    } else {
        session.language = "en";
    }

    console.log(req.protocol);

    res.render("page", {
        changeLangURL: req.protocol + "://" + req.hostname + (req.hostname === "localhost" ? ":" + app.get("port") : "") + "?lang=" + (session.language === "en" ? "fr" : "en"),
        targetLang: session.language === "en" ? "fr" : "en"
    });
});

// custom 404 page
app.use(function(req, res) {
    if (req.query.lang === "fr") {
        session.language = "fr";
    } else {
        session.language = "en";
    }

    res.status(404);
    res.render("404");
});

app.listen(
    app.get("port"),
    function() {
        console.log("Express started on http://localhost:" + app.get("port") + "; ctrl+c to terminate");
    }
);
