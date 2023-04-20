const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const POSTS_PORT = 4000;
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts', (req, res) => {
    const id = randomBytes(8).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };
    res.status(201).send(posts[id]);
})

app.listen(POSTS_PORT, () => {
    console.log("Post server started. Listning on Port:", POSTS_PORT);
})
