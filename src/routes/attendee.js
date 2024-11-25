const router = require("express").Router();
const attendeeController = require("../controllers/attendee");
const validator = require("../utils/attendeesValidator");
const isAuthenticated = require("../utils/verifyAuth")

router
  .get("/", attendeeController.getAll)
  .post(
    "/",
    isAuthenticated,
    validator.postRules(),
    validator.checkResult,
    attendeeController.create,
  )
  .get("/:attendee_id", attendeeController.get)
  .put(
    "/:attendee_id",
    isAuthenticated,
    validator.putRules(),
    validator.checkResult,
    attendeeController.update,
  )
  .delete("/:attendee_id", isAuthenticated, attendeeController.delete)
  .get("/:attendee_id/events", attendeeController.getEvents)
  .put("/:attendee_id/events", isAuthenticated, attendeeController.addEvent)
  .delete("/:attendee_id/events/:event_id", isAuthenticated, attendeeController.deleteEvent);

module.exports = router;
