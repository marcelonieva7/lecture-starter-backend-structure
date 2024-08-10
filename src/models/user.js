const { Model } = require("objection");
const { Abstract } = require("./abstract");

class User extends Abstract {
  type;
  email;
  phone;
  balance;
  city;
  name;

  static get tableName() {
    return "user";
  }

  static get relationMappings () {
    const { Transaction } = require("./transaction");
    const { Bet } = require("./bet");
    const { Event } = require("./event");

    return {
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: "user.id",
          to: "transaction.user_id",
        },
      },
      bets: {
        relation: Model.HasManyRelation,
        modelClass: Bet,
        join: {
          from: 'user.id',
          to: 'bet.user_id',
        },
      },
      events: {
        relation: Model.ManyToManyRelation,
        modelClass: Event,
        join: {
          from: 'user.id',
          through: {
            from: 'bet.user_id',
            to: 'bet.event_id',
          },
          to: 'event.id',
        },
      },
    }
  }
}

module.exports = { User };
