const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        message: "forbidden",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWTSCRECT);
    if (!decoded) {
      throw error(500, "forbidden");
    }
    req.decoded = decoded;
    next();
  } catch (err) {
    next(error(500, "unAuthorize user"));
  }
};

module.exports = verifyToken;
