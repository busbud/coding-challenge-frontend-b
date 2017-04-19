var request = require('supertest');
var shared = require('mocha-shared');

//ensure the NODE_ENV and PORT are resetted
process.env.NODE_ENV ? delete process.env.NODE_ENV : null;
process.env.PORT ? delete process.env.PORT : null;

shared.behavior('shared server tests', function(envSpecificData) {

    var server;

    //start the server before starting the tests
    before(() => {
        //first ensure we are actually reloading the server
        delete require.cache[require.resolve('../../server')];
        //then load the server
        server = require('../../server');
    });

    //close the server when we're done testing
    after(() => server.close());

    it('should respond to /', (done) => {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('should catch 404 errors', (done) => {
        request(server)
            .get('/random-unexisting-address')
            .expect(404, done);
    });

    it('should display the 404 page', (done) => {
        request(server)
            .get('/random-unexisting-address')
            .expect('Content-Type', /html/)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                if (res && res.error && /<body/.test(res.error.text)) {
                    return done();
                }
                done(new Error("The 404 page does not contain a body"));
            });
    });

    it('root page should contain proper version of the JS bundle', (done) => {
        request(server)
            .get('/')
            .expect(200, function(err, res) {
            if (err) return done(err);
            if (res && res.text && new RegExp(envSpecificData.expectedJSFilename).test(res.text)) {
                return done();
            }
            done(new Error("The body does not import the correct version of the JS bundle. (expected "+envSpecificData.expectedJSFilename+")"));
        });
    });
    

});

describe('Express Server Development', function() {

    //ensure the environement is not set
    before(() => {
        process.env.NODE_ENV = 'development';
    });

    //launch common tests
    shared.behavior('shared server tests',{
        expectedJSFilename: ['app.bundle.js']
    });

});

describe('Express Server Production', function() {

    //change the environement to production
    before(() => {
        process.env.NODE_ENV = 'production';
        process.env.PORT = 1080; //-> unable to test port 80 on OSX, using random port as a POC
    });

    //launch common tests
    shared.behavior('shared server tests',{
        expectedJSFilename: ['app.bundle.min.js']
    });

});