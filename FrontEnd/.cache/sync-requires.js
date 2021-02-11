const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/enrique/Documents/Gatsby Project/Exercise/1DayGoogle/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/enrique/Documents/Gatsby Project/Exercise/1DayGoogle/src/pages/index.js"))),
  "component---src-pages-search-js": hot(preferDefault(require("/home/enrique/Documents/Gatsby Project/Exercise/1DayGoogle/src/pages/search.js")))
}

