const router = require("express").Router()
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../../swagger/swagger-output.json")

router.get("/", async (req, res) => {
    if (req.user && req.user.id) res.status(200).send(`Welcome ${req.user.displayName}! </br><a href='/api-docs'>Api docs</a> | <a href='/logout'>logout</a>`)
    else res.status(200).send("Home screen, please <a href='/auth/google'>login</a>.")
  })
router.get('/logout', async (req, res) => {
    req.logout(function(error) {
      if (error) return next(error)
      res.redirect("/")
    })
  })
router.use('/api-docs', (req,res, next) => {
  swaggerDocument.host = req.get('host')
  req.swaggerDoc = swaggerDocument
  next()
}, swaggerUi.serveFiles(swaggerDocument, {}), swaggerUi.setup())
router.use("/attendees", require("./attendee"))
router.use("/events", require("./event"))
router.use("/auth", require("./auth"))

module.exports = router