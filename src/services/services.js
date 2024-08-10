const { userService } = require('./user');
const { transactionService } = require('./transaction');
const { oddsService } = require('./odds');
const { eventService } = require('./events');
const { betsService } = require('./bets');

module.exports = {
  userService,
  transactionService,
  oddsService,
  eventService,
  betsService
};
