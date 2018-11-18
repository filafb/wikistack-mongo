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
    const { author, email, title, content, tags, status } = req.body
    const authorInstance = await User.findOrCreate(author, email)
    const page = new Page({
      title,
      content,
      tags: tags.split(", "),
      author: authorInstance._id
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

router.get("/search", async (req, res, next) => {
  try {
    const tag = req.query.tag
    if(tag){
      const pages = await Page.findByTag(req.query.tag)
      res.render('search', {tag, pages})
    } else res.render('search')
  } catch(err){
    next(err)
  }
})

router.get("/similar/:title", async (req, res, next) => {
  try {
    const [page] = await Page.find({urlTitle: req.params.title})
    const pages = await page.findSimilar()
    res.render('index', {pages})
  } catch(err){
    next(err)
  }
})

router.get('/:title', async (req, res, next) => {
  try {
    const [page] = await Page.find({urlTitle: req.params.title}).populate('author')
    console.log(page.renderedContent)
    res.render('wikipage', {title: page.title, content:page.renderedContent, tags: page.tags, urlTitle: page.urlTitle, author: page.author })
  } catch(err){
    next(err)
  }
})
