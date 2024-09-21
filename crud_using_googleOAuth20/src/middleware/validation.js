const validationJoi = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;  
    next();
  };
};

module.exports = { validationJoi };
