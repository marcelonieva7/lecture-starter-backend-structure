const { Abstract } = require('./abstract');
const { Event: EventModel } = require('../models/models');

class Event extends Abstract {
  constructor(eventsModel) {
    super(eventsModel);
  }

  getAll() {
    return this.model
      .query()
      .withGraphFetched('odds')
      .select('*')
      .execute();
  }

  create(event) {
    return this.model
      .query()
      .insertGraph(event)
      .execute();
  }

  update({eventId, winner, score}) {
    const updated = this.model.transaction( async trx => {
      const updatedEvent = await this.model
        .query(trx)
        .patchAndFetchById(eventId, { score })
        .execute();

      const bets = await updatedEvent.$relatedQuery('bets', trx).execute();
      
      await Promise.all(
        bets.map(async bet => {
          const user = await bet.$relatedQuery('user', trx).execute();

          if (bet.prediction === winner) {
            const balance = user.balance + (bet.betAmount * bet.multiplier);
            await user.$query(trx).patch({ balance }).execute();

            return bet.$query(trx).patchAndFetch({ win: true }).execute();
          } else if (bet.prediction !== winner) {
            return bet.$query(trx).patchAndFetch({ win: false }).execute();
          }
        })
      );
        
      return updatedEvent;
    });

    return updated;
  }
}

const eventRepository = new Event(EventModel);

module.exports = { eventRepository };
