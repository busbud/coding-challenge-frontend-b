<p align="center"><img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" width="200px" /></p>

# Osheaga Festival Microsite - [Busbud Coding Challenge](https://github.com/busbud/coding-challenge-frontend-b)

> A Next.js app for retrieving and displaying [Busbud](https://busbud.com) departures from **Québec** to **Montréal**, for the _Osheaga Festival Musique et Arts_.

**[View Demo](https://brad-busbud-coding-challenge.herokuapp.com/)**

**Table of contents**

1. [Introduction](#introduction)
1. [Stack](#stack)
1. [Scripts](#scripts)
1. [Credits](#credits)

## Introduction

For this coding challenge I chose a stack I'm familiar with, and use regularly. The structure is a simplified version of the scaffolding I usually apply to a React project, with just the necessary parts - `components`, `hooks` and `pages` (plus some basic theming & types).

The backend is a single serverless function, whos main benefit is to hide the authentication token from the public.

For the frontend I wanted to do something a little fancy without going too far outside of the requirements, and trying to keep the LOC to a minimum. The UX is probably not the _best_ for a quick search app, but I had to add **some** transitions 🤓.

In regards to state management, to keep the complexity low (and because I didn't feel the project really warranted it) I simply used React state, rather than something like React context or Redux.

Additionally for number formatting (dates & prices) I took a similar approach, using modern browser APIs, as opposed to third-party libraries.

⚠️ Note: Although the challenge mentioned to use the **2nd of August 2021** as the date, since this is in the past I've used a future date.

## Stack

- 🖥 Frontend
  - ⚛️ React
  - ▲ Next.js
  - 💅 Styled-components
  - ✨ Polished
- 📦 Backend
  - ⚡️ Next.js Serverless Functions

## Scripts

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Create production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Credits

- Background image → [Wicked Backgrounds](https://wickedbackgrounds.com/)
- Spinner/Loading indicator → [@SamHerbert/SVG-Loaders](https://github.com/SamHerbert/SVG-Loaders)
- Icons → [Material Design Icons](https://material.io/icons) via [React Icons](https://react-icons.github.io/react-icons/)
