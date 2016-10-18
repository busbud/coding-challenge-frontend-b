# Bus route ticket display system thing
My first experience using React.JS, ES6, and Webpack. A system to display bus tickets available between two locations for a specific date. Allows multiple system configurations, which are mapped by the hostname. Configurations can be stored locally, or on a config server.

### Features
* React.js, Node.js, ES6ish.
* Localization support, including city names (Montreal vs Montréal), and dates
* Support for multiple systems via config payload, which is determined by the hostname
* Responsive!
* Countdown timer!
* Video?
* Bleeding edge things

### Sample systems
* http://osheaga.freshtapes.com
* http://bonaroo.freshtapes.com
* http://pitchfork.freshtapes.com (warning: auto-plays with sound)
* http://heavymyl.freshtapes.com (warning: auto-plays with sound)
* http://wemf.freshtapes.com (warning: auto-plays with sound)

### Build instructions
* `gulp --debug` to build for development 
* `gulp` to build for production

### Server Configuration
* `server/config.js` holds the server side configuration, checks for ENVVARS and uses them instad, if found.
* `SYSTEMS_CONFIG_LOCATION` this can also be a local path, if remote system configs are not desired. Any URL where the files are available by http will work.

### System Configurations
`config.json` Allows configuration of a video splash, localization overrides, the geohash of the origin and destinations, and the event time and name.
```
{
	"origin" : {
		"geoHash": "dr5reg"
	},
	"destination" : {
		"geoHash": "dn6m9p"
	},
	"currency": "USD",
	"eventStartTime" : "2017-06-08T19:20:30+05:00",
	"departureDate" : "2017-06-07",
	"locales" : {
		"default" : {
			"ORIGIN_NAME" : "New York",
			"DESTINATION_NAME" : "Nashville",
			"EVENT_NAME" : "Bonaroo"
		}
	},
	"video" : {
		"muted" : false,
		"autoPlay" : false,
		"src" : "http://jaredsavage.com/projects/impulse/systems/osheaga/splash.mp4"
	}
}
```
`styles.css` Allows overrides for all of the styles on the page, examples shown for setting the logos and icon colors.
```
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');
body {
  background-color: #571178;
}
.tagLineBanner {
	font-family: 'Shadows Into Light', cursive;
}
.splashBackground {
	background-image: url(illustration.png);
}
header .logo {
	background-image: url(bonaroo.png);
	height: 325px;
}
svg.icon {
	fill: #CCC !important;
}
```

Systems expect this structure, additional resources can be referenced by the css. (the server 302's to the actual resoruce)
```
/systems/hostname/config.json
                 /styles.css
                 /resource.png
```
### Todo
* Implement a real localization library
* Move images, video URLs, etc into the config. (So CSS configuration isn't required.)
* Clean up server/index.js a bit, move the connection stuff into api.js
* Add config option to allow a system to be told which api endpoint to connect to. (Allow direct connection, supplying the token)