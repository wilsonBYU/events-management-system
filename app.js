const express = require("express")
const app = express()
const router = require("./src/routes/index")
const errorHandler = require("./src/utils/errorHandler")

app
  .use(express.json())
  .use("/", router)
  .use(errorHandler)


app.listen(process.env.PORT || 3000, () => {
  console.log("Web server is listening at port "+(process.env.PORT || 3000))
})