#!/bin/bash -e

rm -rf dist

yarn tsc --watch > /dev/null &

until [ -f dist/index.js ]; do sleep 1; done

yarn nodemon --watch  -- --require dotenv/config  dist/index.js
