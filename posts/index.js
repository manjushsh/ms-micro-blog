const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { randomBytes } = require('crypto');
const GlobalConfig = require('../event-bus/configs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const POSTS_PORT = GlobalConfig.PORTS.POSTS;
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts', async (req, res) => {
    const id = randomBytes(8).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    await axios.post(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`, {
        type: 'PostCreated',
        data: posts[id],
    })

    res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
    console.log("Recieved event in Post service: ", req.body.type);
    res.status(201).send({});
});

app.listen(POSTS_PORT, () => {
    console.log("Post server started. Listning on Port:", POSTS_PORT);
})
