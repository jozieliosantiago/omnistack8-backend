const mongoose = require('mongoose');
const Dev = require('../models/Dev');

module.exports = {
  async create(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(mongoose.Schema.Types.ObjectId(devId));

    if (!targetDev) {
      return res.status(400).json('User not exists!')
    }

    if(targetDev.likes.includes(user)) {
      console.log('MATCH');
    }

    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();
    return res.json(loggedDev);
  }
}
