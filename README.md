# Introduction
Hi, I'm Matias Benavides. I have a full introduction written on Linkedin, which you should read so you know me a bit better.
I did this challenge. Took me around 10 hours (A bit more than I would like, tbh)
# About the application:
- I fully realize that I could just put a button to say "search for tickets to go to the festival" and leave it like that, *BUT* Searchers are more fun.
- Tests were not done because of lack of time. I know, lame excuse, but I usually wouldn't approve any merge like this one without coverage.
- Some decisions were made keeping in mind the scope of this. Since this was a fairly simple challenge, folder structure was kept simple across the project. 
- I left comments everywhere, but I know sometimes it's hard to understand why a certain thing was done in a particular way. Feel free to ask me or just to call me out on any weird thing you notice.
- Accessibility is important. It's usually something you can solve as well with Localization (reason why I also skipped some stuff here, like proper and helpful labels)
## Why I used X dependency:
**[Create React App](https://github.com/facebook/create-react-app)**: I was on an airplane when starting this, so I just used CRA with base scripts (As I had a global version already installed). To avoid using external libraries such as *Craco*, I should have used [this library](https://www.npmjs.com/package/custom-react-scripts)
**Typescript**: Everything should be types. All the time, always
**Reach Router**: Simple router with accessibility options
**Craco**: Aliases, to avoid ejecting app
**Material UI (MUI)**: To avoid thinking on design
**Emotion**: Came with MUI. You never know when you will need some of its features
**Isomorphic Fetch**: Enabling to fetch in a cross-browser compliant fashion

### Available Scripts
In the project directory, you can run:
#### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload if you make edits.\
You will also see any lint errors in the console.
#### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\

Notice this is deployed in Heroku, so for deployment:
```
heroku create -b mars/create-react-app
git add .
git commit -m "App"
git push heroku master
heroku open
```

Nowadays it's already configured, so try visiting `https://infinite-caverns-99381.herokuapp.com/`;
