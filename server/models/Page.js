const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const myMarked = require('marked')

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

const pageSchema = new Schema({
  title: { type: String, required: true },
  urlTitle: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: {type: [String]}
});

pageSchema.virtual('route').get(function() {
  return `/wiki/${this.urlTitle}`
})

pageSchema.virtual('renderedContent').get(function() {
  const options = {
    "baseUrl": null,
    "breaks": false,
    "gfm": true,
    "headerIds": true,
    "headerPrefix": "",
    "highlight": null,
    "langPrefix": "language-",
    "mangle": true,
    "pedantic": false,
    "sanitize": false,
    "sanitizer": null,
    "silent": false,
    "smartLists": false,
    "smartypants": false,
    "tables": true,
    "xhtml": false
   }
  return myMarked(this.content, options)
})

pageSchema.pre("validate", function() {
  const urlTitle = generateUrlTitle(this.title)
  this.urlTitle = urlTitle
})

pageSchema.statics.findByTag = function(tag){
  return this.find({tags: {$in: [tag]}})
}

pageSchema.methods.findSimilar = function(){
  return this.model('Page').find({tags: {$in: this.tags}, title: {$ne: this.title}})
}

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
