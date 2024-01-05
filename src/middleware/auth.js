const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config");
const { response401, response500 } = require("../config/response");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] || "";
  if (!token) {
    return res.status(401).json(response401);
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    if (!decoded.role || !decoded.code) {
      return res.status(500).json(response500);
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).json(response401);
  }
  return next();
};

module.exports = verifyToken;
