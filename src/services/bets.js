const { ServerError } = require('../common/common');
const { getMultiplier } = require('../utils/utils');
const { statsEmitter } = require('../events/events');
const {
  betsRepository,
  userRepository,
  eventRepository,
  oddsRepository
} = require('../repositories/repositories');

class Bets {
  betsRepository;
  constructor({
    betsRepository,
    userRepository,
    eventRepository,
    oddsRepository,
    getMultiplier,
    ServerError,
    statsEmitter
  }) {
    this.repository = betsRepository;
    this.userRepository = userRepository;
    this.eventRepository = eventRepository;
    this.oddsRepository = oddsRepository;
    this.getMultiplier = getMultiplier;
    this.ServerError = ServerError;
    this.statsEmitter = statsEmitter;
  }

  async create(bet) {
    const user = await this.userRepository.getById(bet.userId);
    if (!user) {
      throw new this.ServerError('User does not exist', 400);
    }

    if (user.balance < bet.betAmount) {
      throw new this.ServerError('Not enough balance', 400);
    }

    const event = await this.eventRepository.getById(bet.eventId);
    if (!event) {
      throw new this.ServerError('Event not found', 404);
    }

    const odds = await this.oddsRepository.getById(event.oddsId);
    if (!odds) {
      throw new this.ServerError('Odds not found', 404);
    }

    const multiplier = this.getMultiplier(bet.prediction, odds);    
    const currentBalance = user.balance - bet.betAmount;            
    const newBet = await this.repository.create({...bet, multiplier }, currentBalance);

    this.statsEmitter.emit('newBet');
    
    return {...newBet, currentBalance};
  }
}

const betsService = new Bets({
  betsRepository,
  userRepository,
  eventRepository,
  oddsRepository,
  getMultiplier,
  ServerError,
  statsEmitter
});

module.exports = { betsService };
