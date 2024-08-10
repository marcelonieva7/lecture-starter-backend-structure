const { Abstract } = require('./abstract');
const { Model } = require("objection");

class Odds extends Abstract {
  homeWin;
  draw;
  awayWin;
  
  static get tableName() {
    return "odds";
  }

  static get relationMappings () {
    const { Event } = require("./event");
    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: "odds.id",
          to: "event.odds_id",
        },
      }
    }
  }
}

module.exports = { Odds }