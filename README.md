# Technical

## ENV vars
To be able to run this app you need a busbud api key.
Once ou retrieve one, you must add it to the environmental keys with the following name:
`VUE_APP_BUSBUD_TOKEN`

To run it locally and for development purposes you might prefe to add it to your `.env.local` or `.env.dev.local` files.
These files are already in the `.gitignore` list, so they will be ignored.
For testing purposes there is already a fake token set in `.env.test`.
Alternatively you can set this value through the bash command:
```
export VUE_APP_BUSBUD_TOKEN="busbud_token_value"
```
Remember that you need to add it every time you open a bash terminal.
If you are a Windows user, open your command prompt and type the following:
```
setx VUE_APP_BUSBUD_TOKEN "busbud_toke_value"
```
Then close and reopen your command prompt.

Once you've done this step, webpack will take care automatically of adding its value in the code.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
