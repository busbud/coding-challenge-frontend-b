var config = {
    language: "en"
};

/**
 * Basic session object to keep track of preferences throughout app
 * session language is reset at each request
 * @type {Object}
 */
module.exports = Object.create(null, {
    language: {
        get: function() {
            return config.language;
        },
        set: function(v) {
            if (v === "fr" || v === "en") {
                config.language = v;
            } else {
                throw Error("session language can only be set to 'fr' or 'en'. Provided: " + v);
            }
        }
    }
});
