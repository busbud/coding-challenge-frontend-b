# coding-challenge-frontend-b

![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

## Work accomplished

The website let you choose New York as departure city, Montréal as arrival city and any date from current day for your travel.
I didn't lock the date to the 29th of july 2017 because this date is already past and the api return an error.
I add localization in french and english. The website is responsive and is deployed on Heroku.

## Commands

- `yarn start` : launch dev server on [http://localhost:3000](http://localhost:3000) and start sass watch script
- `yarn build` : compile sass code into css and build production content

## Tools Used

- React (with create-react-app)
- Flux for the store management
- Yarn to manage libraries and scripts
- Sass for stylesheets and node-sass-chokidar to build/watch
- Material-Ui for material design components
- i18n-next for localization
- Bootstrap 4 for responsive grid
- Font Awesome 5 for some icons
- Moment to format date
- Lodash for some useful functions
- emoji-flags for fun!

## Heroku Url

[Website on Heroku](https://tranquil-river-17288.herokuapp.com/)

## Remarks

- Travel's date is not locked to 29th of july
- Add pictures of Cities and operators found in Api responses