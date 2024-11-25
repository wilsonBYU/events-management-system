const router = require("express").Router()
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL
  },
  function(accessToken, refreshToken, profile, cb){
    return cb(null, profile)
  }, 
  function(error, profile) {
    return cb(error, profile)
  }

  )
)

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user)
  })
})

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null,user)
  })
})



router.get("/google", passport.authenticate("google", { scope: ["profile"]}))

router.get(
  "/google/callback", 
  passport.authenticate('google', {
    failureRedirect: "/auth/google"
  }),
  (req, res) => {
    res.redirect("/")
  }
)

module.exports = router