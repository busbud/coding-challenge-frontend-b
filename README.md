# Busbud Front-End Coding Challenge

## Running
You can see it now on Heroku:

[busbud-frontend-jhagel.herokuapp.com/](https://busbud-frontend-jhagel.herokuapp.com/)

## Installation

Run:
```sh
npm install
```

Set up the [Environment variable](https://nextjs.org/docs/basic-features/environment-variables) for NextJS
Create local file `.env.local`
```
NEXT_PUBLIC_BUSBUD_TOKEN=${MY_TOKEN}
```

## How to run
### For development:
```sh
npm run dev
```

### For production:
```sh
// to build
npm run build
// to run
npm start -p ${PORT}
```

### For linting:
```sh
// to run the linter
npm run lint
// to fix any fixable issues the linter found
npm run lint:fix
```

## Tech Stack
- [Nextjs](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) for the frontend
- [Material UI](https://mui.com/) for styling
- [RecoilJS](https://recoiljs.org/) for state management

## Points of Interest
### State management
[/store/states.ts](/store/states.ts)
- Using [RecoilJS](https://recoiljs.org/), the API response is broken down {`cities`, `locations`, `operators`, `departures`} and stored in atoms and a selector.
- The selector `departuresFullState` ([#L38](/store/states.ts#L38)) is a derived state of Departures, combining the required information from the other states (cities, etc). 
- `departuresFullState` helps avoid filtering through cities on each render of a departure.
- The states are made the most use of in [/hooks/useFetchSearch.ts](/hooks/useFetchSearch.ts#L34) for setting and [/components/SearchResults.tsx](/components/SearchResults.tsx#L9) for reading.

### API fetching
[/hooks/useFetchSearch.ts](/hooks/useFetchSearch.ts)
- A hook used to fetch the search on form submission and to fetch the poll if not complete.

[/interfaces/response.ts](/interfaces/response.ts)
- Generated interfaces from the Busbud API response from [vilk.com/MakeTypes](https://jvilk.com/MakeTypes/)

[/utils/fetchClient.ts](/utils/fetchClient.ts)
- A simple fetch client (`fetchClient`) to help with error handling ([#L34](/utils/fetchClient.ts#L34))
- To make `fetchClient` more generic and to avoid repeating code, a BusBud api wrapper called `busBudApi` is used ([#L18](/utils/fetchClient.ts#L18))

[/utils/api/search.ts](/utils/api/search.ts)
- An example of how the fetch client (with wrapper) is being used

### Form Validation
[/hooks/useForm.ts](/hooks/useForm.ts)
- A form hook that handles the values, validates and displays errors for the form.
- On submit, it will call [/hooks/useFetchSearch.ts](/hooks/useFetchSearch.ts)'s `fetchSearch`.
- On a location selected, the location will be filtered out of the opposite locations options. This is done to avoid users from selecting Montreal for both the origin and destination location.

### Form 
[/components/SearchForm.tsx](/components/SearchForm.tsx)
- Structured using [Material UI](https://mui.com/) for the inputs and styling.

[/components/LocationPicker.tsx](/components/LocationPicker.tsx)
- An autocomplete with a list of the locations

---

## Challenge details
![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

It will be hot this summer in Montreal with the [Osheaga festival](http://www.osheaga.com/)! 
Your challenge is to build a microsite that allows a traveler from Québec to find one-way departure schedules for the festival's opening weekend.

## Functional requirements

- Has a simple onboarding screen that will trigger the departure search
- Lists all the departures for a given origin city (**Québec - geohash: f2m673**) and a given destination city (**Montréal - geohash: f25dvk**) for a given day (**the 2nd of August 2021**) for **1** adult.
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

### Things that are important to us

- Code quality, maintainability and readability
- Attention to the User Experience

### Things you'll not be evaluated on

- Features we didn't list in this README
- The quantity of code you write

# Documentation

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
