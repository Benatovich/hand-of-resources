const { Router } = require('express');
const Boss = require('../models/Boss');

module.exports = Router()
  .post('/', async (req, res) => {
    const boss = await Boss.create(req.body);
    res.json(boss);
  });
