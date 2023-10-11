const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
    });
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e });
  }
};

module.exports = validate;
