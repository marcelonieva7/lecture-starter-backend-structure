const { Abstract } = require('./abstract');
const { Model } = require("objection");

class Event extends Abstract {

  static get tableName() {
    return "event";
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['oddsId', 'type', 'homeTeam', 'awayTeam', 'startAt'],
      properties: {
        id: { type: 'string', format: 'uuid' },
        oddsId: { type: 'string', format: 'uuid' },
        type: { type: 'string' },
        homeTeam: { type: 'string' },
        awayTeam: { type: 'string' },
        score: { type: ['string', 'null'], default: null },
        start_at: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings () {
    const { Odds } = require("./odds");
    const { Bet } = require("./bet");
    const { User } = require("./user");

    return {
      odds: {
        relation: Model.BelongsToOneRelation,
        modelClass: Odds,
        join: {
          from: "event.odds_id",
          to: "odds.id",
        },
      },
      bets: {
        relation: Model.HasManyRelation,
        modelClass: Bet,
        join: {
          from: 'event.id',
          to: 'bet.event_id',
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'event.id',
          through: {
            from: 'bet.event_id',
            to: 'bet.user_id',
          },
          to: 'user.id',
        },
      },

    }
  }
}

module.exports = { Event };