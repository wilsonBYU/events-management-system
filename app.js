const express = require("express")
const app = express()
const router = require("./src/routes/index")
const errorHandler = require("./src/utils/errorHandler")
const session = require("express-session")
const passport = require("passport")
const crypto = require("crypto")



app
  .use(express.json())
  .use(session({
    secret: crypto.randomBytes(64).toString("hex"),
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.authenticate("session"))
  .use("/", router)
  .use(errorHandler)


app.listen(process.env.PORT || 3000, () => {
  console.log("Web server is listening at port "+(process.env.PORT || 3000))
})