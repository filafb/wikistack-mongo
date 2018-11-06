module.exports = function(swig) {

  const pageLink = function (page) {
    return `<a href=${page.route}>${page.title}</a>`
  }
  pageLink.safe = true

  swig.setFilter('pageLink', pageLink)
}
