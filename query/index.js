const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GlobalConfig = require('../event-bus/configs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const QUERY_PORT = GlobalConfig.PORTS.QUERY;
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', async (req, res) => {
    const { type } = req.body;
    console.log(type);
    switch (type) {
        case GlobalConfig.EVENT_TYPES.POST_CREATED:
            postCreated(req);
            break;
        case GlobalConfig.EVENT_TYPES.COMMENT_CREATED:
            commentCreated(req);
            break;
        case GlobalConfig.EVENT_TYPES.COMMENT_UPDATED:
            commentUpdated(req);
            break;
        default:
            return;
    }
    res.send({});
});

app.listen(QUERY_PORT, () => {
    console.log("Query server started. Listning on Port:", QUERY_PORT);
});

const postCreated = (req) => {
    const { id, title } = req.body?.data;
    posts[id] = { id, title, comments: [] };
}

const commentCreated = (req) => {
    const { id, content, postId, status } = req.body?.data;
    const post = posts[postId] || null;
    post.comments.push({ id, content, status });
}

const commentUpdated = (req) => {
    const { id, content, postId, status } = req.body?.data;

    const post = posts[postId];
    const comment = post.comments.find(c => c.id === id);

    comment.status = status;
    comment.content = content;
}
