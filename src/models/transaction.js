const { Abstract } = require('./abstract');
const { Model } = require("objection");

class Transaction extends Abstract {
  userId;
  cardNumber;
  amount;

  static get tableName() {
    return "transaction";
  }

  static get relationMappings () {
    const { User } = require("./user");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "transaction.user_id",
          to: "user.id",
        },
      }
    }
  }
}

module.exports = { Transaction };