const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    try {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      if(!token) throw new Error();
      
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
      if (role && tokenPayload.type !== role) throw new Error();

      req.user = tokenPayload;

      next()
    } catch (error) {
      return res.status(401).send({ error: 'Not Authorized' });
    }
  };
};

module.exports = { authMiddleware };