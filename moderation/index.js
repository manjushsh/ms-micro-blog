const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const GlobalConfig = require('../event-bus/configs');

const app = express();
app.use(bodyParser.json());
const MODERATION_PORT = GlobalConfig.PORTS.MODERATION;

app.post('/events', async (req, res) => {
    
    res.status(201).send({});
});

app.listen(MODERATION_PORT, () => {
    console.log("Moderation server started. Listning on Port:", MODERATION_PORT);
})
