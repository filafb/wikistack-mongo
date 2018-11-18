const express = require('express')
const router = express.Router()
const User = require("../models/User")
const Page = require("../models/Page")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find()
    res.render('users', {users})
  } catch(err){
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const userP = User.find({_id: req.params.id})
    const pagesP = Page.find({author: req.params.id})
    const [[author], pages] = await Promise.all([userP, pagesP])
    res.render("authorpage", {author, pages})
  } catch(err){
    next(err)
  }
})
