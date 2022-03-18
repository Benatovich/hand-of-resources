-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS armors;

CREATE TABLE armors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    physical SMALLINT,
    -- considered adding vs strike/slash/pierce but i'm lazy
    -- if I have time I'd like to try to refactor this into arrays
    magic SMALLINT,
    fire SMALLINT,
    lightning SMALLINT,
    holy SMALLINT
);



DROP TABLE IF EXISTS attributes;

CREATE TABLE attributes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    stats TEXT NOT NULL
);



DROP TABLE IF EXISTS bosses;

CREATE TABLE bosses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    resists TEXT,
    weakness TEXT,
    lore TEXT
);



DROP TABLE IF EXISTS spells;

CREATE TABLE spells (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    effect TEXT NOT NULL
);



DROP TABLE IF EXISTS weapons;

CREATE TABLE weapons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    physical SMALLINT,
    magic SMALLINT,
    fire SMALLINT,
    lightning SMALLINT,
    holy SMALLINT,
    scaling TEXT NOT NULL
);

-- so much more data I could add. I'm trying to keep it relatively simple here.
-- I think it would be simple to change these tables to hold more complex data from here