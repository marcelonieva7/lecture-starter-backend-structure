const { Model, snakeCaseMappers } = require('objection');

class Abstract extends Model {
  createdAt;
  id;
  updatedAt;

  constructor(){
    super()
  }

  static get columnNameMappers() {
    return snakeCaseMappers()
  }

  $beforeInsert() {
    const date = new Date().toISOString();
    this.createdAt = date;
    this.updatedAt = date;
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = { Abstract };
