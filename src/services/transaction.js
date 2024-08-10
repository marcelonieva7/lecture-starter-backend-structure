const { transactionRepository, userRepository } = require('../repositories/repositories');
const { ServerError } = require('../common/common');

class Transaction {
  constructor(transactionRepository, userRepository, ServerError) {
    this.repository = transactionRepository;
    this.userRepository = userRepository;
    this.ServerError = ServerError;
  }
  async create(transaction) {
    const user = await this.userRepository.getById(transaction.userId);
    if (!user) {
      throw new this.ServerError('User does not exist', 400);
    }
    return this.repository.create(transaction, user.balance);
  }
}

const transactionService = new Transaction(
  transactionRepository,
  userRepository,
  ServerError
);

module.exports = { transactionService };
