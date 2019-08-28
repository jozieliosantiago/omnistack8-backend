const { model } = require('mongoose');
const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async getAll(req, res) {
    const { user } = req.headers;
    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })
    return res.json(users);
  },

  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ],
    })

    return res.json(users);
  },

  async getById(req, res) {
    const dev = await Dev.findById(req.params.id);
    return res.json(dev);
  },

  async create(req, res) {
    const { username } = req.body;
    console.log(username)
    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json('User already exists!');
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);
    const { name, login: user, bio, avatar_url: avatar } = response.data;
    const dev = await Dev.create({
      name,
      user,
      bio,
      avatar
    });
    return res.json(dev);
  },

  async update(req, res) {
    const dev = await Dev.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(dev);
  },

  async delete(req, res) {
    const dev = await Dev.findByIdAndDelete(req.params.id);
    return res.json('Dev removed!')
  }
};
