// Modules
const fs = require('fs')
const path = require('path')
const express = require('express')
const cookie = require('cookie-parser')
const helmet = require('helmet')
const ejs = require('ejs')

// Global Constants
const app = express()
const port = process.env.PORT || 3000;
const templateDir = path.join(__dirname, 'views')
const dataDir = path.join(__dirname, 'data')
const publicDir = path.join(__dirname, 'public')

// Middlewares
app.use(helmet())
app.use(cookie())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

// Template Engine
app.set('view engine', 'ejs')
app.set('views', templateDir)

// Routes
app.get('/', (req, res, next) => {
    res.sendFile(publicDir + '/index.html')
})

app.get('/:wildcard', (req, res, next) => {
    res.sendFile(publicDir + `/${req.params.wildcard}.html`, (error) => {
        if(error) res.sendFile(publicDir + '/404.html')
    })
})

app.get('*', (req, res, next) => {
    res.sendFile(publicDir + '/404.html')
})

// Server
app.listen(port, ()=>{
    console.log(`Server listening at: ${port}`)
})