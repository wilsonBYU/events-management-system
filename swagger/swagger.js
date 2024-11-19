const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Event Management System Api",
    description: "This is the week 3-4 assignment for BYU-I CSE341"
  },
  schemes: [
    "http",
    "https"
  ]
}

const outputFile = "./swagger-output.json"
const routes = ['../src/routes/index.js']

swaggerAutogen(outputFile, routes, doc)