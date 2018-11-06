const express = require('express')
const router = express.Router()
const Page = require("../models/Page")
const User = require("../models/User")

module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const pages = await Page.find()
    res.render('index', {pages})
  } catch(err){
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { author, email, title, content, status } = req.body
    const page = new Page({
      title,
      content,
    })

    const newPage = await page.save()
    res.redirect(newPage.route)
  } catch(err){
    res.render('error', {message: err.message})
  }
})

router.get('/add', (req, res, next) => {
  try{
    res.render('addpage')
  } catch(err){
    next(err)
  }
})

router.get('/:title', async (req, res, next) => {
  try {
    const [page] = await Page.find({urlTitle: req.params.title})
    res.render('wikipage', {title: page.title, content:page.content })
  } catch(err){
    next(err)
  }
})
