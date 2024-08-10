const { Abstract } = require('./abstract');
const { Model } = require("objection");

class Bet extends Abstract {
  eventId;
  userId;
  betAmount;
  prediction;
  multiplier;
  win;

  static get tableName() {
    return "bet";
  }

  static get relationMappings() {
    const { User } = require("./user");
    const { Event } = require("./event");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'bet.user_id',
          to: 'user.id',
        },
      },
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'bet.event_id',
          to: 'event.id',
        },
      },
    };
  }
}

module.exports = { Bet };
