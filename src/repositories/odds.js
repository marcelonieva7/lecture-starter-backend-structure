const { Abstract } = require('./abstract');
const { Odds: OddsModel } = require('../models/models');

class Odds extends Abstract {
  constructor(oddsModel) {
    super(oddsModel);
  }
}

const oddsRepository = new Odds(OddsModel);

module.exports = { oddsRepository };
