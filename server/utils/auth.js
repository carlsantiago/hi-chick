const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h";

module.exports = {
  signToken: function ({ firstName, username, _id, userType }) {
    const payload = { firstName, username, _id, userType };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
