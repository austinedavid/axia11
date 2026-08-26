const errorHandlingMiddleware = (error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Server error" });
};

export default errorHandlingMiddleware;
