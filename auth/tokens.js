const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = { userId };

      const secret_key = process.env.ACCESS_TOKEN_SECRET;

      const options = {
        expiresIn: "2min",
        issuer: "UserDbManager",
        audience: userId,
      };

      const token = jwt.sign(payload, secret_key, options);

      if (!token) reject(token);

      resolve(token);
    });
  },

  verifyAccessToken: async (req, res, next) => {
    try {
      if (!req.headers.token) throw new Error("Unauthorized");
      const { token } = req.headers;
      const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!verifiedToken) throw new Error("Unauthorized");
      const { _id } = verifiedToken;
      req.id = _id;

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  signRefreshToken: async (req, res, next) => {},
};
