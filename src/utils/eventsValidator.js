const { body, validationResult } = require("express-validator")

const eventValidator = {}

/*
  "eventId": "event127",
  "name": "Tech Conference 2024",
  "description": "A conference about the latest in tech.",
  "date": "2024-12-01T10:00:00Z",
  "location": "Convention Center",
  "organizerId": "organizer456",
  "capacity": 500,
  "attendees": [],
  "createdAt": "2024-11-01T12:00:00Z",
  "updatedAt": "2024-11-10T15:00:00Z"
*/

eventValidator.postRules = () => {
  return [
    body("eventId")
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("name")
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("description")
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("date")
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isISO8601().withMessage("must be a valid date"),
    body("location")
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("organizerId")
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("capacity")
      .escape()
      .notEmpty().withMessage("Is required")
      .isInt().withMessage("must be integer"),
    body("attendees")
      .escape()
      .optional(),
    body("createdAt")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date"),
    body("updatedAt")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date")
  ]
}

eventValidator.putRules = () => {
  return [
    body("eventId")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("name")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("description")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("date")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isISO8601().withMessage("must be a valid date"),
    body("location")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("organizerId")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("Is required")
      .isLength({ min: 5}).withMessage("must be minimum 5 characters"),
    body("capacity")
      .optional()
      .escape()
      .notEmpty().withMessage("Is required")
      .isInt().withMessage("must be integer"),
    body("attendees")
      .optional()
      .escape()
      .optional(),
    body("createdAt")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date"),
    body("updatedAt")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date")
  ]
}

eventValidator.checkResult = async (req, res, next) => {
  try {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let newFormat = {}
      await errors.array({onlyFirstError: true}).map(error => newFormat[error.path] = error.msg)
      throw({status: 400, message: newFormat})
    }
  }catch(e){
    next({code: 500, message: e.message})
  }
  next()
}

module.exports = eventValidator