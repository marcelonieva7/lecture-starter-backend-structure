const { Abstract } = require('./abstract');
const { Bet: BetsModel } = require('../models/bet');

class Bets extends Abstract {
  constructor(betsModel) {
    super(betsModel);
  }

  async create(bet, balance) {
    return this.model.transaction( async trx => {
      const newBet = await this.model
        .query(trx)
        .insert(bet)
        .returning('*')
        .execute();

      const user = await newBet.$relatedQuery('user', trx).execute();
      await user.$query(trx).patch({ balance }).execute();

      return newBet;
    })
  }
}

const betsRepository = new Bets(BetsModel);

module.exports = { betsRepository };
