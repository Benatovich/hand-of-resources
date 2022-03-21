const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Spell = require('../lib/models/Spell');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the spells table', async () => {
    const res = await request(app)
      .post('/api/v1/spells')
      .send({
        name: 'magic missile',
        usable: 1
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'magic missile',
      usable: true
    });
  });

});
