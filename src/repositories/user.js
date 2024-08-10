const { Abstract } = require("./abstract");
const { User: UserModel } = require("../models/models");

class User extends Abstract {
  constructor(userModel) {
    super(userModel);
  }
}

const userRepository = new User(UserModel);

module.exports = { userRepository };
