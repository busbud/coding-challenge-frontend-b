# Busbud Front-End Coding Challenge - Manuel Federico Torre

A few notes about the challenge:

*I used a very few libraries which are:

- react-query: I hadn't used It before and wanted to try It. It works great for caching and other stuff. Made the polling easier to me.
- react-i18next: Provides a simple solution for localization

*I hadn't used hooks that much in the past because I'm currently working in a very big enterprise project at my job and even though I tried It out alittle bit, It's the first time I work without any class components. So maybe you can find things to improve regarding my solution. If so, I'd really like to hear how I can improve It.

## Functional requirements

- The application triggers a search on load for current date (since the one provided is old and wouldn't work). I added a datepicker to change the date.
- The polling returns incremental results that are shown to the user. We don't need to wait to "complete:true" in order to show results as long as we use the "index".
- I allow URL parameters "origin" and "destination" to indicate different Geohash for those. I did this because from Quebec to Montreal 
there are very few results and you might not be able to test polling correctly.


## Non-functional requirements

- The site was deployed in Heroku: 

### Bonus

* Localization: support for English, French (used google translator), and Spanish
* Responsive design: The application supports different resolutions. This was made by custom media queries mostly

### Things I couln't do because of lack of time

*TESTING: This is the most important lacking feature I think. I usually use "Testing library" to validate my application behavior. 
*More styling (for example use skeleton tickets/cards when loading, display amenities with icons...)
*currency selector
*If I had more time, I would have added location select dropdowns for origin and destination (instead of URL paramters). I know the challenge states that It should be from Quebec to Glasgow, but with other locations is easier to test IMO.