# Donovan Taitt Submission

## Thought Process and Steps

### Landing Page

As I started I knew that I wanted this page to be simple / minimalist as that as I wanted it to be easy for users to see/access the information that they would want.

Because of this, I made the landing page immediately display the relevant info that was outlined in the prompt (New York to Montreal on August 2, 2020 for 1 adult) and displayed it on a simple grid with a good amount of whitespace.

P.S. I began designing this mobile-first as its usually easier to translate designs from mobile to web then vice-versa

### Data Manipulation

I used `moment` to manipulate the time into something that would be useful for users. Because only the location id was available in my `departures` array, I created a utility function to parse the id and get the location string from the `locations` array.

For currency, I used the native `Intl.NumberFormat` API built into browsers. I know that I could've found an `npm` package to do the same but whenever possible I try to use native technologies as they are more dependable

### Polling

At this point, I created my form so that I could fetch different data based on a different number of adults and I ran into the polling issue. This presented an interesting challenge because my goal was to try and make this as simple as possible.

I seperated the fetching logic into a `journeyService` that only knew how to fetch data based on input. Inside my `App.js` I created a `getJourney` function that had conditional logic based on whether or not I needed to poll for data by using a `while` loop. If the data was fully loaded then the data will render and if not, the app will try again in 2 seconds and then render if it is complete.

### Language and Country Codes

I then added the fields, for language and country codes and made sure that they worked for different values. I couldn't find a built-in language/country code dropdown so I took a pre-built one from online (sourced in the comments) and grabbed the value to plug into the number format API. I needed to create a new formatter every time the form submitted so that I would render the correct values for currency in the correct way any time the language/country changed

### Finishing Touches

Last, I put the finishing styling with `styled-components` using the `BEM` methodology. I like "styled" because it keeps my logic and styles encapsulated so it's easier to use component reuse. I used to use SASS but its difficult to avoid namespacing issues an "styled" has some of the benefits (variables, nesting styles, etc) built-in.

I asked a family member what other information they thought would be useful and they immediately said trip duration so I used `moment` to calculate the difference in time between departure and arrival and added that as well.
