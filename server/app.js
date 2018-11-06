const express = require('express');
const app = express()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const swig = require('swig')
require('../filters')(swig)
const wikiRouter = require('./routes/wiki')
const db = require("./models")

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')))

app.set('views', path.join(__dirname, '../views'))

app.set('view engine', 'html')

app.engine('html', swig.renderFile)

swig.setDefaults({cache: false})

app.use('/wiki', wikiRouter)

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

db.on('error', console.error.bind(console, 'mongodb connection error:')).then(() => {
  console.log('db on')
  app.listen(3000, () => console.log(`listening on port 3000`))
})

