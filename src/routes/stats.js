const { Router } = require('express');
const { authMiddleware } = require('../middlewares/middlewares');
const { stats } = require('../events/events');

const router = Router();

router.get("/",
  authMiddleware('admin'),
  (req, res) => {
    try {    
      return res.send(stats);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
  }
);

module.exports = { router };
