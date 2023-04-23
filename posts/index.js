const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { randomBytes } = require('crypto');
const GlobalConfig = require('../event-bus/configs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(8).toString("hex");
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };

    await axios.post(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`, {
        type: GlobalConfig.EVENT_TYPES.POST_CREATED,
        data: {
            id,
            title,
        },
    });

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);
    res.send({});
});

app.listen(GlobalConfig.PORTS.POSTS, () => {
    console.log("Listening on ", GlobalConfig.PORTS.POSTS);
});
