const EventEmitter = require('events');

class Stats extends EventEmitter {}

const statsEmitter = new Stats();

const stats = {
  totalUsers: 3,
  totalBets: 1,
  totalEvents: 1,
};

const startStatsListeners = () => {
  statsEmitter.on('newUser', () => {
    stats.totalUsers++;
  });
  statsEmitter.on('newBet', () => {
    stats.totalBets++;
  });
  statsEmitter.on('newEvent', () => {
    stats.totalEvents++;
  });
}

module.exports = { stats, statsEmitter, startStatsListeners };
