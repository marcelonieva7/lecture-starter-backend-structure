const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories/repositories');
const { statsEmitter } = require('../events/events')

class User {
  userRepository;
  jwt;
  statsEmitter;
  constructor(userRepository, jwt, statsEmitter) {
    this.repository = userRepository;
    this.jwt = jwt;
    this.statsEmitter = statsEmitter;
  }
  getById(userId) {
    return this.repository.getById(userId);
  }

  async addUser(user) {
    user.balance = 0;
    const newUser = await this.repository.create(user);
    const payload = { id: newUser.id, type: newUser.type };

    this.statsEmitter.emit('newUser');

    return {
      ...newUser,
      accessToken: this.jwt.sign(payload, process.env.JWT_SECRET)
    };
  }

  async updateUser(userId, user) {
    return await this.repository.updateById(userId, user);
  }
}

const userService = new User(userRepository, jwt, statsEmitter);

module.exports = { userService };
