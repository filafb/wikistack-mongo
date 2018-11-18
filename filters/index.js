module.exports = function(swig) {

  const pageLink = function (page) {
    return `<a href=${page.route}>${page.title}</a>`
  }

  const tagLink = function (tag) {
    return `<a href=/wiki/search/?tag=${tag}>${tag}</a>`
  }

  const similarLink = function (urlTitle){
    return `<a href=/wiki/similar/${urlTitle}>Similar</a>`
  }

  const authorLink = function (user) {
    return `<a href=/users/${user._id.toString()}>${user.name}</a>`
  }

  pageLink.safe = true
  tagLink.safe = true
  similarLink.safe = true
  authorLink.safe = true

  swig.setFilter('pageLink', pageLink)
  swig.setFilter("tagLink", tagLink)
  swig.setFilter("similarLink", similarLink)
  swig.setFilter("authorLink", authorLink)
}
