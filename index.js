const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app  = express();
const router = require('./router');
const mongoose = require('mongoose');
const config = require('config');
console.log('App Name:', config.get('name'))

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }
  
mongoose.connect(config.get('mongoURI'),{ useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => console.log('server lisenting on:', port));
