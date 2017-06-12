# Busbud Challenge #
<!-- MarkdownTOC bracket="round" autoanchor="flase" -->

- [Dependencies](#user-content-dependencies)
- [Getting Started](#user-content-getting-started)
	- [Locally](#user-content-locally)
	- [Build Project](#user-content-build-project)

<!-- /MarkdownTOC -->

A single page micro-site built with React (using Busbud API and hosted on Heroku) that triggers a departure search on a specific day for users travelling from New York to Montreal who want to attend the Osheaga Music Festival

The micro-site displays departures available, showing departure/arrival times, price, bus locations, bus operators and option to buy tickets. The micro-site is responsive and offers language support for english and french.

*Note. This micro-site was created for Busbuds coding challenge The requirements for the challenge can be found [here](https://github.com/tlabna/coding-challenge-frontend-b/tree/busbud-challenge/busbud-challenge-README.md)*  

[Live version can be found here.](https://busbud-finder-challenge.herokuapp.com/)

## Dependencies ##
- [Axios](https://www.npmjs.com/package/axios)
- [Express](https://www.npmjs.com/package/express)
- [Moment](https://www.npmjs.com/package/moment)
- [Query-String](https://www.npmjs.com/package/query-string)
- [React](https://www.npmjs.com/package/react)
- [React-Dom](https://www.npmjs.com/package/react-dom)
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom)

## Getting Started ##
### Locally ###
1. Clone this repository
2. In terminal, switch current working directory to repository
3. Make sure you have NPM installed. Simply install [NodeJs](https://nodejs.org/en/download/)
4. Install packages needed for project by typing in terminal ``` npm i ```
5. To view project locally start dev server by typing in terminal ``` npm run dev ```

### Build Project ###
1. After following instructions for setting up the project locally, to build for production, in your terminal type ``` npm run postinstall ```
2. (Optional) If you wish to host the project online, such as how this project is hosted on Heroku.
	1. Create a [Heroku Account](https://www.heroku.com/) 
	2. Create a Heroku app. (You can either give it a name or let heroku generate one)
	3. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
	4. Login Heroku by typing in terminal ``` $ heroku login ```
	5. Next you need to create a remote in your git repository to push to heroku. To do this in terminal type ``` $ heroku git:remote -a [heroku-app-name] ```
	6. Now that you have a remote set up. To deploy your repository, in terminal type ``` $ git push heroku master ```
	7. Heroku should now start building and deploying your app. 
