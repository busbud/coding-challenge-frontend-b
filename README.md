# Busbud Front-End Coding Challenge

## Description

This application is my answer to the front-end coding challenge for Busbud recruitment.

The original requirements were to create a microsite allowing to search for a bus ticket for the [Osheaga festival](http://www.osheaga.com/).

Due to coronavirus, lots of bus companies in North America have stopped their travels. I changed the application so that it is also possible to search for trips between Manchester and London, where buses are still travelling.

There is a simple on-boarding screen for the user arriving on the site, and a search results page with filtering options, to help the user find the perfect trip for them.

## Notes

### What went well

- I did make an application with routing, which is something I had never done from scratch before.
- The application is responsive and accessible.
- There is a good amount of SEO components to help improve the crawling of the page.
- I am quite happy with the way I managed to separate the UI layout from the more "logical" parts of the pages.

- I learned a lot about TypeScript while using it.

- Heroku is really nice to use.

### What could be improved

- The way TypeScript is done here is a mess.

- I spent way too long trying to come up with a nice UI that would make lots of features possibles. In the end, I did not reach a satisfactory solution and had to abandon some of those features.

- The interface is almost ready for allowing to book adult, children and senior tickets, but not completely. Children and seniors passengers need to be able to specifi their ages, and I did not have the time to make a good Input component allowing to do this in an fluid manner.

- Ideally, I wanted to use `i18next` to include localisation to this application, but I did not have the time to do it properly so I had to scrap it. It was still interesting to learn about it.
- Similarly, it would be good to have a way to set the currency used by the customer.
- It would be nice to have some way of sorting the results according to different criterias (price, length of trip, nnumber of stops or others).
- At the moment the cities's geohashes are hard-coded in a constants file. It would be better to have a third-party allowing to compute those geohashes for any place in the world.
- Similarly, it would be nice to have an autocomplete for the cities fields.
- It would be nice to view the trip on a map (or at least the area surrounding the departure and arrial stations).

- This might be slightly over-engineered but makes it easy to extend in the future.
