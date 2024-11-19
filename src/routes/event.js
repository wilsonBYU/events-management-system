const router = require("express").Router()
const eventController = require("../controllers/event")

router
  .get("/", eventController.getAll)
  .get("/:event_id", eventController.get)
  .post("/", eventController.create)
  .put("/:event_id", eventController.update)
  .delete("/:event_id", eventController.delete)

module.exports = router