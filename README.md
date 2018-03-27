# coding-challenge-frontend-b

![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

It will be hot this summer in Montreal with the [Osheaga festival](http://www.osheaga.com/)!

## Functional Requirements

* Visiting the microsite will immediately trigger a departure search. The React front-end calls a simple Express server which calls the Busbud API. The call could have been made from the React app but the Express server could allow for more advanced features such as cacheing or other server-side manipulation of data.
* As this is to be a single-purpose site for a given origin, destination and date, there seems like no point making the user navigate through form elements, so let's get loading and not hang about!
* Relevant details are shown from each departure and well... the point is to book tickets, right? So there's a working booking button which passes the user over to Busbud.

## Non-functional requirements

* Check out the microsite at https://osheaga-busbud.herokuapp.com/

### Bonus

* Localization is implemented using `react-intl` and supports French and English.
* A responsive layout is implemented using `ant-design`'s Grid flex system.

### Remarks

* Though I'm using LESS to override some `ant-design` styles, I had some issues getting LESS fully up and running. Please excuse my inline styling!
* My philosophy with importing modules and frameworks (e.g. Moment.js vs writing a one-off function), is to leverage them if they can speed up development and review later if performance is an issue or some custom solution is needed.
* Next steps: for further development I would implement testing with Jest, logging with Bunyan, state-management with Redux and type checking with TypeScript or `prop-types`.

# Local installation

* To install locally first clone this repo.

  `git clone https://github.com/challengineer/coding-challenge-frontend-b.git`

  `cd coding-challenge-frontend-b`

* Create a `.env` file containing:

```
BUSBUD_API=https://napi.busbud.com
ACCEPT=application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/
X_BUSBUD_TOKEN=***YOUR KEY HERE***
```

* Then run:

  `npm i && cd client && yarn && cd .. && npm start`
