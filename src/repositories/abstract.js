class Abstract {
  model;

  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model
      .query()
      .insert(data)
      .returning('*')
      .execute();
  }

  deleteById(id) {
    return this.model.query().deleteById(id).execute();
  }

  getAll() {
    return this.model.query().execute();
  }

  getById(id) {
    const result = this.model
      .query()
      .findById(id)
      .execute();

    return result ?? null;
  }

  updateById(id, data) {
    return this.model
      .query()
      .patchAndFetchById(id, data)
      .execute();
  }

}

module.exports = { Abstract };
