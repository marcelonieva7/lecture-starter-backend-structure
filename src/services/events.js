const { eventRepository } = require('../repositories/repositories');
const { getWinner } = require('../utils/utils');
const { statsEmitter } = require('../events/events')

class Event {
  constructor(eventRepository, getWinner, statsEmitter) {
    this.repository = eventRepository;
    this.getWinner = getWinner;
    this.statsEmitter = statsEmitter;
  }
  getAll() {
    return this.repository.getAll();
  }

  add(event) {
    this.statsEmitter.emit('newEvent');

    return this.repository.create(event);
  }

  async update(eventId, score) {
    const winner = this.getWinner(score);
    const updated = await this.repository.update({eventId, winner, score});

    return updated
  }
}

const eventService = new Event(eventRepository, getWinner, statsEmitter);

module.exports = { eventService };
