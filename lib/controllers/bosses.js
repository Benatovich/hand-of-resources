const { Router } = require('express');
const Boss = require('../models/Boss');

module.exports = Router()
  .post('/', async (req, res) => {
    const boss = await Boss.create(req.body);
    res.json(boss);
  })

  .get('/', async (req, res) => {
    const boss = await Boss.getAll(req.body);
    res.json(boss);
  })

  .get('/:id', async (req, res) => {
    const boss = await Boss.getById(req.params.id, req.body);
    res.json(boss);
  })

  .patch('/:id', async (req, res) => {
    const boss = await Boss.updateById(req.params.id, req.body);
    res.json(boss);
  });
