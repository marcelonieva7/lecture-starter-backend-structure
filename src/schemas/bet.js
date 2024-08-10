const joi = require('joi');

const bet = joi.object({
  eventId: joi.string().uuid().required(),
  betAmount: joi.number().min(1).required(),
  prediction: joi.string().valid('w1', 'w2', 'x').required(),
}).required();

module.exports = { bet };
