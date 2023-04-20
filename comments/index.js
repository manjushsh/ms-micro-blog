const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const COMMENTS_PORT = 4001;
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', (req, res) => {
    try {
        const commentId = randomBytes(16).toString('hex');
        const { content } = req.body;
        const comments = commentsByPostId[req.params.id] || [];
        comments.push({ id: commentId, content });
        commentsByPostId[req.params.id] = comments;
        res.status(201).send(comments[comments?.length - 1]);
    }
    catch (err) {
        res.status(500).send({ message: "Something went wrong while adding comment." });
    }
});

app.listen(COMMENTS_PORT, () => {
    console.log("Comment server started. Listning on Port:", COMMENTS_PORT);
});
