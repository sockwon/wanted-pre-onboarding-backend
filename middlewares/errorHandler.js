const errorHandlerSync = (err, req, res, next) => {
  console.error(err.stack);
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message });
};

const errorHandlerAsync = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res);
    } catch (err) {
      console.error(err.stack);
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };
};

module.exports = {
  errorHandlerSync,
  errorHandlerAsync,
};
