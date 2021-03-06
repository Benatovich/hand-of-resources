const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Armor = require('../lib/models/Armor');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new entry in the armors table', async () => {
    const res = await request(app)
      .post('/api/v1/armors')
      .send({
        name: 'test armor',
        physical: 1,
        magic: 2,
        fire: 3,
        lightning: 4,
        holy: 5
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'test armor',
      physical: 1,
      magic: 2,
      fire: 3,
      lightning: 4,
      holy: 5
    });
  });

  it('gets a list of armors', async () => {
    await Armor.create({ name: 'test armor', physical: 1, magic: 4 });
    const res = await request(app)
      .get('/api/v1/armors');

    expect(res.body).toEqual(
      await Armor.getAll()
    );
  });

  it('gets an armor by id', async () => {
    const armor = await Armor.create({ name: 'test armor', physical: 1, magic: 4 });
    const res = await request(app)
      .get(`/api/v1/armors/${armor.id}`);

    expect(res.body).toEqual(armor);
  });

  it('updates an armor by id', async () => {
    const armor = await Armor.create({ name: 'test armor', fire: 1, lightning: 4 });
    const res = await request(app)
      .patch(`/api/v1/armors/${armor.id}`)
      .send({ name: 'test armor' });

    expect(res.body).toEqual(armor);
  });

  it('deletes an armor by id', async () => {
    const armor = await Armor.create({
      name: 'test armor',
      magic: 3,
      holy: 5,
    });
    const res = await request(app)
      .delete(`/api/v1/armors/${armor.id}`);

    expect(res.body).toEqual(armor);
    expect(await Armor.getById(armor.id)).toBeNull();
  });
});
