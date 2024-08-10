const { Router } = require('express');
const { betsService } = require('../services/services');
const { bet: betSchema } = require('../schemas/schemas')
const { authMiddleware, validationMiddleware } = require('../middlewares/middlewares');
const { ServerError } = require('../common/common');

const router = Router();

router.post('/',
  authMiddleware(),
  validationMiddleware(betSchema),
  async (req, res) => {
    try {
      const bet = {...req.body, userId: req.user.id};
      const newBet = await betsService.create(bet);
      
      return res.json(newBet);
    } catch (error) {
      if (error instanceof ServerError) {
        return res.status(error.statusCode).send({ error: error.message });
      }
      return res.status(500).send("Internal Server Error");
    }
  }
)

module.exports = { router };
