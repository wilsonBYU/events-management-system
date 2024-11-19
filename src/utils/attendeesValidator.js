const {body, validationResult} = require("express-validator")

const attendeesValidator = {}

attendeesValidator.postRules = () => {
  return [
    body("attendeeId")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({ min: 3}).withMessage("please enter a valid attendee id (attendee###)"),
    body("name")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({ min: 3}).withMessage("please enter a valid name"),
    body("email")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .normalizeEmail()
      .isEmail().withMessage("enter a valid email"),
    body("phone")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isMobilePhone("en-US").withMessage("please enter a valid phone number"),
    body("eventId")
      .optional()
      .trim()
      .escape(),
    body("registrationDate")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date"),
    body("checkedIn")
      .escape()
      .notEmpty().withMessage("is required")
      .isBoolean().withMessage("expected a boolean value"),
    body("createdAt")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date"),
    body("updatedAt")
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isISO8601().withMessage("must be a valid date"),
  ]
}

attendeesValidator.putRules = () => {
  return [
    body("attendeeId")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({ min: 3}).withMessage("please enter a valid attendee id (attendee###)"),
    body("name")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({ min: 3}).withMessage("please enter a valid name"),
    body("email")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .normalizeEmail()
      .isEmail().withMessage("enter a valid email"),
    body("phone")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isMobilePhone().withMessage("please enter a valid phone number"),
    body("eventId")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isLength({ min: 3}).withMessage("please enter a valid eventId id (event###)"),
    body("registrationDate")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isDate().withMessage("must be a valid date"),
    body("checkedIn")
      .optional()
      .notEmpty().withMessage("is required")
      .isBoolean().withMessage("expected a boolean value"),
    body("createdAt")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isDate().withMessage("must be a valid date"),
    body("updatedAt")
      .optional()
      .trim()
      .escape()
      .notEmpty().withMessage("is required")
      .isDate().withMessage("must be a valid date"),
  ]
}

attendeesValidator.checkResult = async (req, res, next) => {
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

module.exports = attendeesValidator