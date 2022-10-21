const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  signAccessToken: (userId) => {
    return new Promise(async (resolve, reject) => {
      const payload = { userId };

      const secret_key = process.env.ACCESS_TOKEN_SECRET;

      const options = {
        expiresIn: "2min",
        issuer: "UserDbManager",
        audience: userId,
      };

      const token = await jwt.sign(payload, secret_key, options);

      if (!token) reject(token);

      resolve(token);
    });
  },
};
