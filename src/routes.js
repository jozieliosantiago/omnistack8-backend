const express = require('express');
const routes = express.Router();
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

routes.get('/devs', DevController.index);
// routes.get('/devs/:id', DevController.getById);
routes.post('/devs', DevController.create);
// routes.put('/devs/:id', DevController.update);
// routes.delete('/devs/:id', DevController.delete);

routes.post('/devs/:devId/likes', LikeController.create);
routes.post('/devs/:devId/dislikes', DislikeController.create);

module.exports = routes;
