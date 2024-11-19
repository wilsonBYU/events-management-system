const errorHandler = async (err, req, res, next) => {
  console.error(`Error ${err.code}: ${JSON.stringify(err.message)}`)
  res.status(err.code || 500).json({error: err.message || "an error has occurred"})
}

module.exports = errorHandler