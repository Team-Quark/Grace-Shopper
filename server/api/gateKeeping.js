const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
};

//VULNERABILITIES TO LOOK INTO:
// + DO NOT RETURN ADMIN STATUS ON USER
// + PASSWORD NOT ENCRYPTED FROM BROWSER TO SERVER
// CHECK EVERY USER REQ WITH REQUIRE TOKEN MIDDLEWARE
