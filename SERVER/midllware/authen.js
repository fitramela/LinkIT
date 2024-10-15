const {User} = require('../models')
const jwt = require('jsonwebtoken');
const authenticate = async (req, res, next) => {

    let token = req.headers.authorization;
    console.log(token)
    token = token.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User  not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

  module.exports = authenticate