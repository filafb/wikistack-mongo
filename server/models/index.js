const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/wikistack')

const db = mongoose.connection

module.exports = db

