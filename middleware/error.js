const AppError = require("../helpers/error");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
      sendErrorProd(error, res);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldDB(error);
      sendErrorProd(error, res);
    } else if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
      sendErrorProd(error, res);
    } else {
      sendErrorProd(err, res);
    }
  }
};

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  } else {
    //TODO: log the error

    res.status(500).json({
      success: false,
      status: "error",
      message: "something went wrong",
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use anothe value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

module.exports = errorHandler;
