const { Abstract } = require('./abstract');
const { userRepository } = require('./user');
const { transactionRepository } = require('./transaction');
const { oddsRepository } = require('./odds');
const { eventRepository } = require('./events');
const { betsRepository } = require('./bets');

module.exports = {
  Abstract,
  userRepository,
  transactionRepository,
  oddsRepository,
  eventRepository,
  betsRepository
};