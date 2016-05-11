var rJSON = require("relational-json"),
    schema = require("./busbud-schema");

/**
 * Compile the relational-json db for the session
 */
module.exports = rJSON(schema);
