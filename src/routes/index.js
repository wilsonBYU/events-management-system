const router = require("express").Router()
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../../swagger/swagger-output.json")

router.get("/", async (req, res) => {
    res.status(200).send("This is the home screen")
  })
  router.use('/api-docs', (req,res, next) => {
    swaggerDocument.host = req.get('host')
    req.swaggerDoc = swaggerDocument
    next()
  }, swaggerUi.serveFiles(swaggerDocument, {}), swaggerUi.setup())
  router.use("/attendees", require("./attendee"))
  router.use("/events", require("./event"))

module.exports = router