const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const GlobalConfig = require('../event-bus/configs');

const app = express();
app.use(bodyParser.json());
const MODERATION_PORT = GlobalConfig.PORTS.MODERATION;

const MODERATED_TERMS = ["app"];

app.post('/events', async (req, res) => {

    const { type, data } = req.body;
    switch (type) {
        case GlobalConfig.EVENT_TYPES.COMMENT_CREATED:
            commentCreated(req);
            break;
        default:
            return;
    }
    res.status(200).send({});
});

app.listen(MODERATION_PORT, () => {
    console.log("Moderation server started. Listning on Port:", MODERATION_PORT);
});

const commentCreated = async (req) => {
    const { id, content, postId } = req.body?.data;
    const status = MODERATED_TERMS.some(term => content.includes(term)) ? GlobalConfig.COMMENT_STATUS.REJECTED : GlobalConfig.COMMENT_STATUS.APPROVED;
    await axios.post(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`, {
        type: GlobalConfig.EVENT_TYPES.COMMENT_MODERATED,
        data: {
            content,
            id,
            postId,
            status
        }
    });
}
