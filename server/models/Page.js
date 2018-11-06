const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

pageSchema.virtual('route').get(function() {
  return `/wiki/${this.urlTitle}`
})

pageSchema.pre("validate", function() {
  const urlTitle = generateUrlTitle(this.title)
  this.urlTitle = urlTitle
})

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
