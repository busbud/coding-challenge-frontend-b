# coding-challenge-frontend-b
![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

It will be hot this summer in Montreal with the [Osheaga festival](http://www.osheaga.com/)! 
Your challenge is to build a microsite that allows a traveler from NYC to find one-way departure schedules for the festival's opening weekend.

## @nicoespeon's implementation

Hi there 👋

As we don't have a chance to code this one together, I'll explain decisions I made here, in this README. This can trigger interesting discussions later on!

These are decisions I'd take alone in this journey. But I believe standards should definitely be taken as a team. Pair-programming and code reviews are perfect moments to build them.

🤠 **To get started**, you need to create a `.env.local` file − just duplicate the `.env` file which is versioned. Then, use a valid Busbud API Token to retrieve the data. I didn't want to push that secret to production!

### Commits messages

I follow the [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

This is useful to quickly scan commit history. It can even be used to generate automatic changelogs − actually that's what the Angular team does.

[Commitizen](https://github.com/commitizen/cz-cli) helps me doing that.

### .gitignore

I added some configuration generated with [gitignore.io](https://www.gitignore.io).

That way, a complete, standard gitignore is produced.

Standard configuration shares best practices − e.g. using IntelliJ, it will ignore user-specific files but still share project-specific ones, so we can share the same settings among the team.

As for project-specific ignored files, I ignore `*.local` files so we can't create files locally that will override global configuration − e.g. `.env.local`. 

### Code formatting

I installed [Prettier](https://github.com/prettier/prettier) to get rid of discussions about the style of the code during code review.

I believe this should be automated. Prettier provides an opinionated starter with style conventions. These conventions could be change as our team standards evolve through discussions. Still, styling is not an issue because we automated that as a commit hook − thanks to [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged), to keep it efficient and transparent for the developer.

### Testing

I'm using [Jest](http://facebook.github.io/jest/) along with [Enzyme](http://airbnb.io/enzyme/) to easily test my React components.

### React

As of the indications, I went for React, starting from the [create-react-app boilerplate](https://github.com/facebookincubator/create-react-app).

This allows me to quickly quick-start an working environment to:
- run the app in development mode using `npm start`
- run tests using `npm test`
- build the app for production deployment using `npm run build`

### Redux-Observable

To manage the application state, I went for [redux-observable](https://github.com/redux-observable/redux-observable).

While it may not be necessary for such a little app, I made this choice because:
- Observables are a great pattern to manage async stuff in a declarative way. Actually, I regularly [talk](https://medium.com/@nicoespeon/talk-fr-%C3%A0-la-d%C3%A9couverte-des-observables-d3a10ab4a056) and [write](https://hackernoon.com/using-observables-to-make-our-app-work-with-barcode-scanners-e8a673fba625) around about this data structure.
- It would be easier to scale on the async logic introduced by the HTTP calls this app requires.
- I do like Elm. And Redux is implementing [The Elm Architecture](https://futurice.com/blog/elm-in-the-real-world) in JavaScript, which I appreciate.
- I wanted to have fun trying a React-Redux-RxJS stack and this challenge is a great moment to do that 🤘😎🤘

### Semantic UI

As for building an interface, I like to go with [Semantic UI](https://semantic-ui.com/).

The design looks great by default, it's responsive and it has a lot of components that [Materialize](http://materializecss.com/) doesn't. As a matter of feeling, I prefer Semantic UI over Twitter Bootstrap.

Plus, it has an official [React integration](https://react.semantic-ui.com/introduction) which comes handy for this project.

For this challenge, I'll go with a mobile-first spirit to ensure a responsive design. I would enhance the design progressively to take advantages of larger screen, but at least it'd work everywhere until then.

## Functional Requirements
- Has a simple onboarding screen that will trigger the departure search
- Lists all the departures for a given origin city (**New York - geohash: dr5reg**) and a given destination city (**Montréal - geohash: f25dvk**) for a given day (**the 2nd of August 2018**) for **1** adult.
- For each departure, we want, at least, to see the **departure time**, the **arrival time**, the **location name** and the **price** (use `prices.total` of the `departure`).

## Non-functional requirements

- Challenge is submitted as pull request against this repo ([fork it](https://help.github.com/articles/fork-a-repo/) and [create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).
- The microsite should be deployed to [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

### Bonus
* Localization: support for multiple languages (English, French, ...)
* Responsive design

### Remarks

* You can setup your microsite any way you like; we're partial to NodeJS, ExpressJS and React
* CSS can be written using SASS, LESS or similar higher-level language

# Documentation

## Supporting API
The following documentation describes the API you'll need to use to build out the challenge deliverable.

The API you'll be using is hosted at https://napi.busbud.com. This is the Busbud production API.

To interact with it from your code, you'll need to provide the following HTTP headers

HTTP Header | Value
------------|------
Accept | application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/
X-Busbud-Token | value provided in challenge invitation email (if not contact us)

### Search overview
Search is performed in two steps

1. A [search is initialized](#initialize-search), and may be `complete` if results are served from cache
2. An initialized and incomplete [search is polled](#poll-search) until `complete`

### Initialize search

Initiating kicks off a search against the various supplier systems if one has yet to be started. It also includes a wealth of related models (cities, locations, oeprators, etc) in its response to ensure a client has all the context necessary to present a compelling experience to the user. If the cache already holds departures for the requested search, the departures will be returned as part of the response.

To get departures, search is initialized via the following endpoint:

    https://napi.busbud.com/x-departures/:origin/:destination/:outbound_date

Path parameters:  

- `origin` : Origin's geohash
- `destination` : Destination's geohash
- `outbound_date` : ISO 8601 Outbound departure date

Querystring parameters:

- `adult` : Number of adults
- `child` : Number of children
- `senior` : Number of seniors
- `lang` : ISO 3166-1 alpha-2 language code
- `currency` : ISO 4217 currency code

The response looks like:
```
{
  "origin_city_id": "375dd5879001acbd84a4683dedf9eed1",
  "destination_city_id": "375dd5879001acbd84a4683ded9c875b",
  "cities": [
    { City },
    { City }
  ],
  "locations": [
    { Location }
    { Location }
  ],
  "operators": [
    { Operator },
    { Operator }
  ],
  "departures": [
    { XDeparture },
    { XDeparture }
  ],
  "complete": false,    // <!-- determines if all departures have been received from all relevant bus companies
  "ttl": 900,
  "is_valid_route": true
}
```

Where a City is like:
```
   {
      "id": "375dd5879001acbd84a4683deda84183",
      "locale": "en",
      "region_id": 6417,
      "name": "New York",
      "lat": 40.71427,
      "lon": -74.00597,
      "geohash": "dr5reg",
      "timezone": "America/New_York",
      "image_url": "/images/promos/city-blocks/new-york.jpg",
      "legacy_url_form": "NewYork,NewYork,UnitedStates",
      "full_name": "New York, New York, United States",
      "region": {
        "id": 6417,
        "locale": "en",
        "country_code2": "US",
        "name": "New York",
        "country": {
          "code2": "US",
          "locale": "en",
          "code3": "USA",
          "name": "United States",
          "continent": "NA",
          "default_locale": "en",
          "default_currency": "USD",
          "population": 310232863
        }
      }
    }
```
Where a Location is like:
```
    {
      "id": 3970,
      "city_id": "375dd5879001acbd84a4683dedfb933e",
      "name": "Métro Bonaventure Bus Station",
      "address": [
        "997 Rue St-Antoine Ouest",
        "Montreal, QC H3C 1A6"
      ],
      "type": "transit_station",
      "lat": 45.4988273060484,
      "lon": -73.5644745826722,
      "geohash": "f25dvfzcz"
    }
```
Where an Operator is like:
```
    {
      "id": "bfc27cd544ca49c18d000f2bc00c58c0",
      "source_id": 155,
      "profile_id": 111,
      "name": "Greyhound",
      "url": null,
      "logo_url": "https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}",
      "display_name": "Greyhound",
      "sellable": true,
      "fuzzy_prices": false,
      "sell_tickets_cutoff": {
        "hours": 1
      },
      "amenities": {
        "classes": {
          "Normal": {
            "display_name": "Economy",
            "wifi": true,
            "toilet": true,
            "ac": true,
            "food": false,
            "refreshment": false,
            "power_outlets": true,
            "tv": false,
            "bus_attendant": false,
            "leg_room": false
          },
          "Economy": {
            "display_name": "Economy",
            "wifi": true,
            "toilet": true,
            "ac": true,
            "food": false,
            "refreshment": false,
            "power_outlets": true,
            "tv": false,
            "bus_attendant": false,
            "leg_room": false
          }
        }
      },
      "source": "greyhound_us",
      "referral_deal": false,
      "display_url": null,
      "fraud_check": "iovation",
      "terms": {
        "refund": false,
        "exchange": true,
        "bag_allowed": true,
        "piece_of_id": false,
        "boarding_requirement": "printed_tkt",
        "extra_bag_policy": true,
        "use_new_ticket": false,
        "exchange_cutoff": 24,
        "nb_checked_bags": 1,
        "kg_by_bag": 25,
        "nb_carry_on": 1,
        "extra_bag_cost": 1500
      }
    }
```
And an XDeparture is :
```
    {
      "id": "7c5dd26a",
      "source_id": 155,
      "checkout_type": "new",
      "operator_id": "bfc27cd544ca49c18d000f2bc00c58c0",
      "origin_location_id": 1942,
      "destination_location_id": 1938,
      "class": "Economy",
      "class_name": "Economy",
      "amenities": {
        "display_name": "Economy",
        "wifi": true,
        "toilet": true,
        "ac": true,
        "food": false,
        "refreshment": false,
        "power_outlets": true,
        "tv": false,
        "bus_attendant": false,
        "leg_room": false
      },
      "available_seats": 55,
      "prices": {
        "total": 5200,
        "breakdown": {
          "base": 5200
        },
        "categories": {},
        "discounted": false
      },
      "ticket_types": [
        "print"
      ],
      "departure_timezone": "America/New_York",
      "arrival_timezone": "America/Montreal",
      "departure_time": "2016-01-14T00:01:00",
      "arrival_time": "2016-01-14T07:55:00"
    }
```

### Poll search

Polling provides incremental updates from the [initial search](#initialize-search) attempt. _Polling can only be performed after a successful fetch has been initiated_. The response contains a `complete` property which indicates if the system is done fetching departures from bus companies. The polling endpoints should be called every 2-5 seconds until `complete` is true.

To avoid getting the same departures data multiple times, Busbud supports pagination starting at arbitrary indices using the `index` querystring parameter. For example, if after the first polling request 10 departures are returned and `complete` is false, the second polling request should use `?index=10` to only get new departures.

> **Tip**
>
> Incremental updates are only available during the small period of time when Busbud is retrieving departures from bus companies. Once departures for a specific date and set of passengers are obtained, they are saved in a cache for a period of time.
>
> Although the cache cannot be bypassed, you can change the date or the number of passengers to trigger a new search and obtain incremental updates.

While the `complete` property from the response is false, you need to call:

    https://napi.busbud.com/x-departures/:origin/:destination/:outbound_date/poll

with ***all*** the same parameters as the previous endpoint, plus the following additional querystring parameter:

- `index` : Index from which to return new departures, generally set to the total number of departures received since the initial search

The response is similar to:
```
{
  "departures": [
    { XDeparture },
    { XDeparture }
  ],
  "operators": [
    { Operator },
    { Operator }
  ],
  "complete": true,
  "ttl": 900
}
```
