const validationMiddleware = (schema, key='body', partial = false) => {
  return async (req, res, next) => {
    try {
      let adjustedSchema = schema;
      if (partial) {
        adjustedSchema = schema.fork(Object.keys(schema.describe().keys), (field) => field.optional());
      }
      const validData = await adjustedSchema.validateAsync(req[key]);
      req[key] = validData

      next()
    } catch (error) {
      return res.status(400).json({error: error.details[0].message})
    }
  };
};

module.exports = { validationMiddleware };
