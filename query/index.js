const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
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
    handleEvent(req);
    res.send({});
});

app.listen(QUERY_PORT, async () => {
    console.log("Query server started. Listning on Port:", QUERY_PORT);
    try {
        const res = await axios.get(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`);
    
        for (let event of res.data) {
          console.log("Processing event:", event.type);
          handleEvent(event.type, event.data);
        }
      } catch (error) {
        console.log(error.message);
      }
});

const handleEvent = (type, data) => {
    switch (type) {
        case GlobalConfig.EVENT_TYPES.POST_CREATED:
            postCreated(data);
            break;
        case GlobalConfig.EVENT_TYPES.COMMENT_CREATED:
            commentCreated(data);
            break;
        case GlobalConfig.EVENT_TYPES.COMMENT_UPDATED:
            commentUpdated(data);
            break;
        default:
            return;
    }
}

const postCreated = (data) => {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
}

const commentCreated = (data) => {
    const { id, content, postId, status } = data;
    const post = posts[postId] || null;
    post.comments.push({ id, content, status });
}

const commentUpdated = (data) => {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(c => c.id === id);

    comment.status = status;
    comment.content = content;
}
