#
![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

Hi New York guys, it will be hot this summer in Montreal with the [Osheaga festival](http://www.osheaga.com/)! 

Find your ❤️ one-way departure schedules for the festival's opening weekend with this microsite.

# DEMO
You can find the site here https://sleepy-brook-87772.herokuapp.com

This website is responsive design, so you can see all the departure details with your phone.

# Run this site locally

```
 // Intall
  yarn or npm install

 // Run 
  yarn dev or npm run dev

 //Test
  yarn test or npm run test
```

# Technical choice

## React
I choose React because i have some experience with this libraries. It makes the creation of interactive UIs more simple, and the life cycle of the component is under control. And another reason is i want to use the context API to manage the translation.

## Webpack

Bundler and develoment server.

## Redux
Reasons why I choose Redux:
* Avoid the mutating of previous state
* Simple for test, we can do DDD in FrontEnd
* Every component can be connected to reducer, it's simple to share data between the component

## normalizr
Re-organized data as i want. I used the normalizr to organize the locations data by its id.

## SASS

Structures the stylesheet using nested classes

## Material UI libary

Just for the disign

## Possible improvements

* Use React Suspense for async Rendering
* The departure search work only for New York and Montrél with a define date and one passenger right, in the future all the text field should be active, and search with more possibilities.
* Use enzyme to complete the UI Components test.