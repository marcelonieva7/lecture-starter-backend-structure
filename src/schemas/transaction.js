const joi = require('joi');

const transaction = joi.object({
  userId: joi.string().uuid().required(),
  cardNumber: joi.string().required(),
  amount: joi.number().min(0).required(),
}).required();

module.exports = { transaction };
