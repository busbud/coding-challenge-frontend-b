# Bus route ticket display system thing
System to display bus tickets available between two locations for a specific date. Allows multiple system configurations, which are mapped by the hostname. Configurations can be stored locally, or on a config server.

### Features
1. React.js, Node.js, ES6ish.
2. localization support, including city names (Montreal vs Montréal)
3. Support for multiple systems via config payload, which is determined by the hostname
4. Countdown timer!
4. Video?
5. Bleeding edge things

### Sample systems
1. http://osheaga.freshtapes.com
2. http://bonaroo.freshtapes.com
3. http://pitchfork.freshtapes.com (warning: auto-plays with sound)

### Build instructions
* `gulp --debug` to build for development 
* `gulp` to build for production

### Server Configuration
1. `src/server/config.json` holds everything for the server side configuration
2. `SYSTEMS_CONFIG_LOCATION` this can also be a local path (/systems/), if remote system configs are not desired. Any url where the files are available will work.

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
	"i18n" : {
		"default" : {
			"ORIGIN_NAME" : "New York",
			"DESTINATION_NAME" : "Nashville",
			"EVENT_NAME" : "Bonaroo"
		}
	},
	"video" : {
		"muted" : false,
		"autoPlay" : false,
		"src" : "http://jaredsavage.com/projects/impulse/systems/bonaroo/splash.mp4"
	}
}
```
`styles.css` Allows overrides for all of the styles on the page, examples shown for setting the logos and icon colors.
```
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');

.tagLineBanner {
	font-family: 'Shadows Into Light', cursive;
}
.splashBackground {
	background-image: url(illustration.png);
}
.logo {
	background-image: url(bonaroo.png);
	height: 325px !important;
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