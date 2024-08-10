const { router: eventsRouter } = require('./events');
const { router: betsRouter } = require('./bets');
const { router: usersRouter } = require('./users');
const { router: healthRouter } = require('./health');
const { router: transactionRouter } = require('./transaction');
const { router: statsRouter } = require('./stats');

const initRoutes = (app) => {
  app.use('/events', eventsRouter),
  app.use('/bets', betsRouter),
  app.use('/users', usersRouter),
  app.use('/health', healthRouter);
  app.use('/transactions', transactionRouter);
  app.use('/stats', statsRouter);
}

module.exports = { initRoutes };
