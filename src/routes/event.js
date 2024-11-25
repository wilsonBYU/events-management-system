const router = require("express").Router()
const eventController = require("../controllers/event")
const passport = require("passport")
const isAuthenticated = require("../utils/verifyAuth")
const eventValidator = require("../utils/eventsValidator")

router
  .get("/", eventController.getAll)
  .post("/", 
    isAuthenticated, 
    eventValidator.postRules(), 
    eventValidator.checkResult, 
    eventController.create)
  .get("/:event_id", eventController.get)
  .put("/:event_id", 
    isAuthenticated,
    eventValidator.putRules(),
    eventValidator.checkResult,
    eventController.update)
  .delete("/:event_id", isAuthenticated, eventController.delete)
  .get("/:event_id/attendees", eventController.getAttendees)

module.exports = router