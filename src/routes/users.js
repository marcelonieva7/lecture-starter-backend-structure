const { Router } = require('express');
const { UniqueViolationError } = require('objection');
const { user: userSchema, userId: userIdSchema, updateUser: updateUserSchema } = require('../schemas/schemas')
const { validationMiddleware, authMiddleware } = require('../middlewares/middlewares');
const { userService } = require('../services/services');

const router = Router();

router.get('/:id',
  validationMiddleware(userIdSchema, 'params'),
  async (req, res) => {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found'})
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
)

router.post('/',
  validationMiddleware(userSchema),
  async (req, res) => {
    try {
      const newUser = await userService.addUser(req.body);
      return res.json(newUser);
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        return res.status(400).json({ error: error.nativeError.detail });
      }
      return res.status(500).send("Internal Server Error");
    }
  }
)

router.put('/:id',
  authMiddleware(),
  validationMiddleware(userIdSchema, 'params'),
  validationMiddleware(updateUserSchema, 'body', true),
  async (req, res) => {
    try {
      if (req.user.id !== req.params.id) {
        return res.status(401).send({ error: 'UserId mismatch' });;
      }
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      if (error instanceof UniqueViolationError) {
        return res.status(400).json({ error: error.nativeError.detail });
      }
      return res.status(500).send("Internal Server Error");
    }
  }
)

module.exports = { router };
