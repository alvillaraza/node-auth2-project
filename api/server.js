const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const restricted = require('../auth/restricted-middleware.js');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkDept('user'), usersRouter);

server.get('/', (req, res) => {
  res.send('working');
});

module.exports = server;

function checkDept(dept) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.dept &&
      req.decodedToken.dept.toLowerCase() === dept 
    ) {
      next();
    } else {
      res.status(403).json({ you: "shall not pass" });
    }
  };
}