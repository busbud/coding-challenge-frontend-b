# Busbud Front-End Coding Challenge

This is the coding challenge submission for Thomas Baxter (... hey! That's me!)
This allows users to specify an origin and destination along with a date, and will query the Busbud production API

## Functional Technologies Used
* redux
* axios
* date-fns

## DX Technologies Used
* typescript
* eslint
* depcheck
* prettier

# Environment Variables

The following env vars are using by the application.


* `REACT_APP_BUSBUD_API_SERVER`: The server to query
* `REACT_APP_BUSBUD_DEFAULT_DESTINATION`: The geohash of the location selected as the destination by default
* `REACT_APP_BUSBUD_DEFAULT_ORIGIN`: The geohash of the location selected as the origin by default
* `REACT_APP_BUSBUD_TOKEN`: The token to sign all requests to `REACT_APP_BUSBUD_API_SERVER` with
* `REACT_APP_BUSBUS_API_POLL_FREQUENCY`: How frequently poll operations should check the pending request on the server
* `REACT_APP_DEFAULT_CURRENCY`: The currency to use by default
* `REACT_APP_DEFAULT_LANGUAGE`: The language to use by default

NOTE: There are several env vars declare above - i.e. origin, destination, currency and language - which would probably best be deferred to the
browser for detection. They are added as env vars for the sake of expediency in this coding challenge.
