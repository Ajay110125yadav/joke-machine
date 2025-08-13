const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return req.status(401).json({ msg: 'No token' });
  const token = authHeader.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next()

  } catch (err) {
    res.status(401).json({ msg: 'Token invalid' });
  }
};