## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## The project

This objective of this project is to create a microsite that allows a traveler from Québec to finde one-way departure schedules for the festival's opening weekend.

## The architecture

For this project I'm using:

- [NextJS](https://nextjs.org/): a React framework for hybrid static and server rendering. It's great for productivity, smart bundling, pre-fetching, etc.

- [Typescript](https://www.typescriptlang.org/): a superset of Javascript. It greatly improves the productivity over time, avoiding many typing errors before you effectively run the code.

- [Tailwind](https://tailwindcss.com/): a CSS framework that has a core-concept of utility-first. It's customizable and easy-to-use.

- [Storybook](https://storybook.js.org/): Since I've built some custom components, and thinking about scalability, it's great to have storybook to have a one-glance awareness of what components are there and what they actually do. While the application grows, it gets harder and harder to not repeat components that were already created. On that subject, I've implemented Storybook to demonstrate a way on how it could be used and added custom components to it. I just scratched the surface of it, but it's a good start.

- [ESLint](https://eslint.org/): Required in any project, it gives protection against ourselves to prevent silly errors that we may commit without even realizing.

- [Husky](https://github.com/typicode/husky): An opensource project to automate some actions, in this case, before commits, to run tasks like linting and prettify the code. It can be used to run tests, other scripts, etc.

- [Jest](https://jestjs.io/): The most used (by me) javascript testing framework.

- [SASS](https://sass-lang.com/): CSS with superpowers 👓. I didn't use many SCSS skills only because Tailwind got my back on that, it definitely works great. I had some small uses of it for writing CSS transitions, but if you think that it's not enough, please, let me know.


- [next-i18next](https://github.com/isaachinman/next-i18next): A plugin for NextJS that allows to get translations supporting SSR. This project was structured with internationalization in two main languages: French and English, but it's fairly easy to implement more languages. In that part, I'm using only one `common.json` for the sake of simplicity, but while the project grows, it's wise to separate namespaces to not only keep it simple, but keep it more efficient.

- [Stylelint](https://stylelint.io/): A linter to help avoid errors on styles.

Despite this is a test project, it is structured to be responsive, scalable, maintainable and testable.