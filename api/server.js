const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const register = require('../auth/restricted-middleware.js');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', register, usersRouter);

server.get('/', (req, res) => {
  res.send('working');
});

module.exports = server;