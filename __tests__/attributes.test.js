const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Attribute = require('../lib/models/Attribute');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the attributes table', async () => {
    const res = await request(app)
      .post('/api/v1/attributes')
      .send({
        name: 'vigor',
        stats: 'hp, defense'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'vigor',
      stats: 'hp, defense'
    });
  });


});
