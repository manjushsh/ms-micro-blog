const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const QUERY_PORT = 4002;
const posts = {};

app.get('/posts', (req, res) => {
    console.log(posts);
    res.send(posts)
});

app.post('/events', async (req, res) => {
    const { type } = req.body;
    console.log(type);
    switch (type) {
        case 'PostCreated':
            postCreated(req);
            break;
        case 'CommentCreated':
            commentCreated(req);
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
    const { id, content, postId } = req.body?.data;
    const post = posts[postId] || null;
    post?.comments?.push({ id, content });
    posts[postId] = post;
}
