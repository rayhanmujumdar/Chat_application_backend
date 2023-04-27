const infoErrorHandler = (_req, _res, next) => {
  const error = new Error("There was an error");
  error.status = 404;
  next(error);
};
const errorHandler = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  } else {
    return res.status(500).json({
      message: "Something was wrong",
    });
  }
};

module.exports = {
  errorHandler,
  infoErrorHandler
};
