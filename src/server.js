const express = require('express');
const server = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/tindev', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

server.use(cors());
server.use(express.json());
server.use('/api', routes);

server.listen(3333);
