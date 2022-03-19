const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/armors', require('./controllers/armors'));
app.use('/api/v1/attributes', require('./controllers/attributes'));
app.use('/api/v1/bosses', require('./controllers/bosses'));
// app.use('/api/v1/spells', require('./controllers/spells'));
// app.use('/api/v1/weapons', require('./controllers/armors'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
