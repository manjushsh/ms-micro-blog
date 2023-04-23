const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const GlobalConfig = require("../event-bus/configs");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const COMMENTS_PORT = GlobalConfig.PORTS.COMMENTS;

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(16).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: GlobalConfig.COMMENT_STATUS.PENDING });
    commentsByPostId[req.params.id] = comments;

    await axios.post(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`, {
      type: GlobalConfig.EVENT_TYPES.COMMENT_CREATED,
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: GlobalConfig.COMMENT_STATUS.PENDING,
      },
    });

    res.status(201).send(comments);
  }
  catch (err) {
    res.status(500).send({ message: "Something went wrong while adding comment. Error: ", err });
  }
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case GlobalConfig.EVENT_TYPES.COMMENT_MODERATED:
      const { content, id, postId, status } = data;
      const comments = commentsByPostId[postId];
      const comment = comments.find(c => c.id === id);
      comment.status = status;
      // Emit event once moderation done
      await axios.post(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`, {
        type: GlobalConfig.EVENT_TYPES.COMMENT_UPDATED,
        data: { content, id, postId, status },
      });
      break;
    default:
      break;
  }
  console.log("Event Received", req.body.type);

  res.send({});
});

app.listen(COMMENTS_PORT, () => {
  console.log("Comments server Listening on ", COMMENTS_PORT);
});
