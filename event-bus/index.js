const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const GlobalConfig = require('./configs');

const app = express();
app.use(bodyParser.json());
const EVENT_BUS_PORT = GlobalConfig.PORTS.EVENTS;
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post(`${GlobalConfig.POSTS_BASE_ENDPOINT}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${GlobalConfig.COMMENTS_BASE_ENDPOINT}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${GlobalConfig.QUERY_BASE_ENDPOINT}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${GlobalConfig.MODERATION_BASE_ENDPOINT}/events`, event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(EVENT_BUS_PORT, async () => {
  console.log("Events server started. Listning on Port:", EVENT_BUS_PORT);
})
