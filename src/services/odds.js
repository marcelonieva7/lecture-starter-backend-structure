const { oddsRepository } = require('../repositories/repositories');
class Odds {
  constructor(oddsRepository) {
    this.repository = oddsRepository;
  }
  getAll() {
    return this.repository.getAll();
  }

  add(odd) {
    return this.repository.create(odd);
  }
} 

const oddsService = new Odds(oddsRepository);

module.exports = { oddsService };
