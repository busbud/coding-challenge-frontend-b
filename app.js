
// SETTING MODULES //
var express = require('express');
var Twig = require('twig'), twig = Twig.twig;
var request = require('request');
var async = require('async');
var whilst = require('async/whilst');
var app = express();

// SETTING HEADER //
var options = {
              url: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-07-29',
              headers: {
                        'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A',
                        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
                       }
              };

// SETTING VARIABLE DATA //
var data;


// SET PORT FOR HEROKU APP //
app.set('port', (process.env.PORT || 5000));



// CREATING A STATIC FILE DIRECTORY FOR PICTURES //
app.use(express.static('public'))

// CALLING API ON SERVER SIDE //
app.get('/', function (req, res) {

                                    // ASYNCHRONOUS: LOOP UNTIL DATA.COMPLETE = TRUE //
                                    async.whilst(

                                                  // PARAMETER 1 : CONDITION THAT CHECKS WHETHER TO ENTER LOOP OR NOT //
                                                  function() {

                                                               // VERIFY IF DATA IS EMPTY //
                                                               if (!data) {
                                                                           return true;
                                                                         };
                                                               // DATA IS NOT EMPTY & IF DATA.COMPLETE = FALSE => CONTINUE LOOPING //
                                                               console.log(data.complete)
                                                               return (!data.complete);
                                                             },

                                                  // PARAMETER 2 : LOOP EXECUTION //
                                                  function(cb) {

                                                                // MAKE REQUEST(HEADERES,FUNCTION(ERR,RESPONSE)) //
                                                                request(options,function(err, response){

                                                                                // IF REQUEST WORKS, CALLBACK DATA //
                                                                                if(!err && response.statusCode == 200){

                                                                                // REFRESH DATA CONTENT //
                                                                                data = JSON.parse(response.body);

                                                                                // EXECUTE THE CALLBACK FUNCTION IN PARAMETER 3 //
                                                                                cb(null,response, data);
                                                                                }

                                                                                // IF REQUEST FAILS //
                                                                                else{
                                                                                  console.log('err')
                                                                                  cb(err || response.statusCode);
                                                                                }
                                                                              })

                                                              },

                                                  // PARAMETER 3: DEFINE CALLBACK FUNCTION //
                                                  function (err, n,data) {
                                                    res.render('index.twig', {
                                                      data : data
                                                    });
                                                  }
                                                )


                             });

// APP LISTENING FOR HEROKU APP //

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
