"use strict";
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        basePath: '../',

        files: [
            'src/bower_components/angular/angular.js',
            'src/bower_components/moment/moment.js',
            'src/bower_components/moment/locale/fr-ca.js',
            'src/bower_components/angular-mocks/angular-mocks.js',

            'tests/mockApp.js',

            // business
            'src/components/osheaga-trip.js',
            'src/services/**/*.js',

            // tests
            'tests/components/**/*.js',
            'tests/services/**/*.js'
        ],

        browsers: ['PhantomJS'],
        browserNoActivityTimeout: 60000,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        colors: true
    });
};
