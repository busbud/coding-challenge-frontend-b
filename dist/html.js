"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Html = function (props) { return (React.createElement("html", null,
    React.createElement("head", null,
        React.createElement("title", null, "App")),
    React.createElement("body", null,
        React.createElement("div", { id: "app" }, props.children),
        React.createElement("link", { href: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans", rel: "stylesheet" }),
        React.createElement("script", { id: "initial-data", type: "text/plain", "data-json": props.initialData }),
        React.createElement("script", { defer: true, src: "vendors~main.bundle.js" }),
        React.createElement("script", { defer: true, src: "bundle.js" })))); };
exports.default = Html;
//# sourceMappingURL=html.js.map