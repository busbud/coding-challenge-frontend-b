# coding-challenge-frontend-b by Romain Bevillard

Hi Everyone at Busbud! 
It is my pleasure to present you with my entry to the front-end coding challenge. Here is some additional info:

## How to use/install
The app can be seen at https://rbevillardbusbudchallenge.herokuapp.com/  

To launch the app locally:  
(Assuming lastest node and npm are installed on the system)  
`(sudo) npm install -g webpack webpack-dev-server`  
`git clone https://github.com/rombevillard/coding-challenge-frontend-b && cd coding-challenge-frontend-b`  
`npm install`  
`npm run dev`  
(Optional, in another shell, same directory)  
`webpack-dev-server --inline --hot` to enable hot module reloading

## What I've used
I didn't want to use a boilerplate app or a generator (like Yeoman for instance), because there were some things I was not really familiar with (React and Webpack to quote a few, see below), so I wanted to understand how they work from the root. This was also for the sake of clarity and avoiding useless code/files/directories. Here are the most relevant things to be mentioned:

### React and Webpack
At first I felt like using what I know best when it comes to building something, ie. Angular 2 and/or Ionic 2 (which also uses Webpack for building purposes). But then I figured "Well let's give React a go and get deeper into webpack features which I only skimmed until now", because A) It's something I've been wanting to try out for quite a while now, B) it's called a "challenge" for a reason, and working with Angular would have been nothing really challenging for me, and C) I hear you guys work mainly with React, so I might as well get used to it if I'm going to join your team! Anyway this was fun, a bit hard to get into at first when coming from Angular which is different in some aspects but similar in others, but React is definitely solid and great to use.
### Express
Express rules. Period.
### Material Design Lite
A lightweight CSS/JS lib from Google that follows [Material Guidelines](https://material.google.com/).  
[getmdl.io](https://getmdl.io/)
### SASS
There is a very few lines of SASS in the app's source since most of the styling is done through Material Design Lite classes.
### React Translate Component / counterpart
A neat little React component and module combo that allows to localise content. https://github.com/martinandert/react-translate-component/

## Possible improvements
I think everything is always perfectible so here's what I reckon could improve the app and its use:

* Unit tests
* Localising components' attributes (eg. title)
* Relaunch x-departures request OR refresh date and time formats when changing language
* Using Flux / Redux for actions such as changing language or requesting departures
* ...

Thank you very much for taking my application into consideration, and I look forward to hearing from you soon.
