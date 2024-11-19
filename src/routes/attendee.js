const router = require("express").Router()
const attendeeController = require("../controllers/attendee")
const validator = require("../utils/attendeesValidator")

router
  .get("/", attendeeController.getAll)
  .get("/:attendee_id", attendeeController.get)
  .post("/", /*validator.postRules(), validator.checkResult,*/ attendeeController.create)
  .put("/:attendee_id", validator.putRules(), validator.checkResult, attendeeController.update)
  .delete("/:attendee_id", attendeeController.delete)

module.exports = router