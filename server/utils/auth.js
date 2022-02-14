const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h";

module.exports = {
  signToken: function ({ firstName, username, _id }) {
    const payload = { firstName, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
