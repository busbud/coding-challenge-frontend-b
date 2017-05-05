module.exports = {
    "env": {
    	"browser": true,
        "node": true,
        "mocha": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": [
	"react"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
   	"semi": [2, "always"],
        "no-mixed-spaces-and-tabs": [2, "smart-tabs"],
	"no-console": 0
    }
};
