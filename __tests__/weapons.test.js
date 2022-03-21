const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Weapon = require('../lib/models/Weapon');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the weapons table', async () => {
    const res = await request(app)
      .post('/api/v1/weapons')
      .send({
        name: 'battleaxe',
        usable: 1
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'battleaxe',
      usable: true
    });
  });

});
