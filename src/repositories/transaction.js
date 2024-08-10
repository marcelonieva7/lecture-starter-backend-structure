const { Abstract } = require("./abstract");
const { Transaction: TransactionModel } = require("../models/models");
const { ServerError } = require("../common/common");

class Transaction extends Abstract {
  ServerError;
  constructor(transactionModel, ServerError) {
    super(transactionModel);
    this.ServerError = ServerError;
  }

  create(transaction, userBalance) {
    return this.model.transaction( async trx => {
      const createdTransaction = await this.model
        .query(trx)
        .insert(transaction)
        .returning('*')
        .execute();

      const currentBalance = transaction.amount + userBalance;      
      
      await createdTransaction
        .$relatedQuery('user', trx)
        .patch({ balance: currentBalance })
        .execute();
      
      return {
        ...createdTransaction,
        currentBalance
      };
    });
  }
}

const transactionRepository = new Transaction(TransactionModel, ServerError);

module.exports = { transactionRepository };
