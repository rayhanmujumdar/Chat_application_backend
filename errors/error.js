// 404 error handler
const infoErrorHandler = (_req, _res, next) => {
  const error = new Error("Requested url not found");
  error.status = 404;
  next(error);
};

const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next("There was an error");
  } else {
    if (err.status) {
      return res.status(err.status).json({
        message: err.message,
      });
    } else {
      return res.status(500).json({
        message: "Something was wrong",
      });
    }
  }
};

module.exports = {
  errorHandler,
  infoErrorHandler,
};
