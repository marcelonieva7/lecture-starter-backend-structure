const { Router } = require('express');
const { eventService } = require('../services/services');
const { event: eventSchema, eventScore: eventScoreSchema } = require('../schemas/schemas')
const { validationMiddleware, authMiddleware } = require('../middlewares/middlewares');

const router = Router();

router.post('/',
  authMiddleware('admin'),
  validationMiddleware(eventSchema),
  async (req, res) => {
    try {
      const event = await eventService.add(req.body);

      return res.json(event);
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.put('/:id',
  authMiddleware('admin'),
  validationMiddleware(eventScoreSchema),
  async (req, res) => {
    try {
      const { params, body } = req;
      const event = await eventService.update(params.id, body.score);

      return res.json(event);
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = { router }