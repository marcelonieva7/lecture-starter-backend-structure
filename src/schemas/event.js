const joi = require('joi')

const event = joi.object({
  id: joi.string().uuid(),
  type: joi.string().required(),
  homeTeam: joi.string().required(),
  awayTeam: joi.string().required(),
  startAt: joi.date().required(),
  odds: joi.object({
    homeWin: joi.number().min(1.01).required(),
    awayWin: joi.number().min(1.01).required(),
    draw: joi.number().min(1.01).required(),
  }).required(),
}).required();

const eventScore = joi.object({
  score: joi.string().required(),
}).required();

module.exports = { event, eventScore };
