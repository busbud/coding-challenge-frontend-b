# Busbud Front-End Coding Challenge

![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

## App Structure

* src
    * /**assets**/**jss**
        JavaScript Style Sheets https://www.w3.org/Submission/1996/1/WD-jsss-960822
    * /**components**
        * /**Brand**
            Logo component
        * /**Dropdown**
            Customized ```<button><select>```
        * /**Header**
            Static header for ```<Brand>``` and language switch ```<button>```
        * /**Helmet**
            Dynamically set ```<head>``` elements, e.g. ```<html lang="en|fr">```
        * **i18n**
            **Class-based components** implementing i18n state management with ```connect``` from ```react-redux``` https://www.npmjs.com/package/react-redux
        * **SearchPanel**
            Read-only search fields ```<form>```
        * **SearchResults**
            * /**SearchResult**
                **Functional component** for displaying individual departure
            * /**SearchResults**
                **Functional component** for triggering search and rendering results with ```useState``` & ```useEffect``` hooks state management
    * /**constants**
      * some sample geohash for easy access
    * **messages**
      * **en**, **fr**, etc. individual language files
    * /**services**
      * **getDepartures.js** simple ```fetch``` with single poll
      - [ ] ```useInterval``` https://usehooks-typescript.com/react-hook/use-interval
      - [ ] ```Redux-Thunk``` https://www.npmjs.com/package/redux-thunk
      - [ ] ```Redux-Saga``` https://www.npmjs.com/package/redux-saga
    * /**state**
      * /**actions**
      * /**reducers**
      * /**store**
      * **i18n** Class based component state management
  * **App.jsx**
    * ```<html>``` wrapper
  * **index.jsx**
    * ```<Provider>``` ```store``` from ```react-redux``` https://www.npmjs.com/package/react-redux
    * ```ConnectedDynamicIntlProvider``` i18n component
* **.env**
  * REACT_APP_API_SCHEDULES_URL=%API_URL%
  * REACT_APP_API_ACCESS_TOKEN=%API_ACCESS_TOKEN%
* **.env.production**
  * GENERATE_SOURCEMAP=false
* **server.js**
  * Express JS server to serve production build https://www.npmjs.com/package/express

## Functional requirements

- Search is triggered on page load via ```src/components/SearchResults/SearchResults``` component
- Lists all the departures for origin city **Québec - geohash: f2m673** and destination city **Montréal - geohash: f25dvk** for _current day_ for **1** adult.

## Non-functional requirements

- Deployed to https://quiet-lowlands-81884.herokuapp.com/

### Bonus
- [x] Localized in english & français
- [x] Responsive design via https://material-ui.com/

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# BusBud Documentation

## Supporting API

The following documentation describes the API you'll need to use to build out the challenge deliverable.

The API you'll be using is hosted at https://napi.busbud.com. This is the Busbud production API.

To interact with it from your code, you'll need to provide the following HTTP headers

HTTP Header | Value
------------|------
Accept | `application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/`
X-Busbud-Token | value provided in challenge invitation email (if not contact us)

### Search overview

Search is performed in two steps

1. A [search is initialized](#initialize-search), and may be `complete` if results are served from cache
2. An initialized and incomplete [search is polled](#poll-search) until `complete`

### Initialize search

Initiating kicks off a search against the various supplier systems if one has yet to be started. It also includes a wealth of related models (cities, locations, operators, etc) in its response to ensure a client has all the context necessary to present a compelling experience to the user. If the cache already holds departures for the requested search, the departures will be returned as part of the response.

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
- `lang` :  ISO 639-1 (2 letter code) language code (supported values include `en`, `fr`, `es`, and a few others)
- `currency` : ISO 4217 currency code (supported values include `CAD`, `USD`, `EUR`, and a few others)

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

And an XDeparture is like:
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
