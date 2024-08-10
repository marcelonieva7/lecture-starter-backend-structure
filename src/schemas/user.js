const joi = require('joi');

const userId = joi.object({
  id: joi.string().uuid().required(),
});

const updateUser = joi.object({
  email: joi.string().email().required(),
  phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/).required(),
  name: joi.string().required(),
  city: joi.string(),
}).required();

const user = updateUser.keys({
  id: joi.string().uuid(),
  type: joi.string().required(),
}).required();

module.exports = { user, userId, updateUser };
