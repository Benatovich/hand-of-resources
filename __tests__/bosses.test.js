const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Boss = require('../lib/models/Boss');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the bosses table', async () => {
    const res = await request(app)
      .post('/api/v1/bosses')
      .send({
        name: 'Hank',
        defeated: 1
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Hank',
      defeated: true
    });
  });





});
