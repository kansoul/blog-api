const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const validationErrors = {};
    let errorLength = 0;
    error.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
      errorLength += 1;
    });
    return res.status(400).json({
      error: true,
      code: 400,
      message: `${errorLength} errors occurred`,
      type: error.name,
      errors: validationErrors,
    });
  }
};

module.exports = validation;
