const { Router } = require('express');
const { authMiddleware, validationMiddleware } = require('../middlewares/middlewares');
const { transaction: transactionSchema } = require('../schemas/schemas');
const { transactionService } = require('../services/services');
const { ServerError } = require('../common/common');

const router = Router();

router.post('/',
  authMiddleware('admin'),
  validationMiddleware(transactionSchema),
  async (req, res) => {
    try {
      const newTransaction = await transactionService.create(req.body);

      return res.json(newTransaction);
    } catch (error) {
      if (error instanceof ServerError) {
        return res.status(error.statusCode).send({ error: error.message });
      }
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = { router };
