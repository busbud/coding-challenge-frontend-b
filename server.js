/* eslint-disable @typescript-eslint/no-var-requires */
// Packages
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  express().listen(port, (err) => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
  })
})
