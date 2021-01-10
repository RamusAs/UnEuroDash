const { status } = require('../helpers/status');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyTokenAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split('Bearer ')[1];
  if (!token) {
    return response.status(status.bad).send({
      status: 'bad',
      message: 'Token non fourni'
    });
  }
  try {
    const decoded =  jwt.verify(token, process.env.SECRET);

    if (!decoded.is_admin) {
      return response.status(status.bad).send({
        status: 'bad',
        message: 'Seul l\'administrateur peur effectuer cette action'
      });
    }

    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      is_admin: decoded.is_admin,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
    };

    next();
  } catch (error) {
    res.status(status.unauthorized).send({
      status: 'error',
      message: error.message,
      name: error.name
    });
  }
};

const verifyTokenUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split('Bearer ')[1];
  if (!token) {
    return response.status(status.bad).send({
      status: 'bad',
      message: 'Token non fourni'
    });
  }
  try {
    const decoded =  jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      is_admin: decoded.is_admin,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
    };
    next();
  } catch (error) {
    res.status(status.unauthorized).send({
      status: 'error',
      message: error.message,
      name: error.name
    });
  }
};

module.exports = {
  verifyTokenAdmin,
  verifyTokenUser
};