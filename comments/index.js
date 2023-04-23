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
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post(`${GlobalConfig.EVENT_BASE_ENDPOINT}/events`, {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
      },
    });

    res.status(201).send(comments);
  }
  catch (err) {
    res.status(500).send({ message: "Something went wrong while adding comment. Error: ", err });
  }
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);

  res.send({});
});

app.listen(COMMENTS_PORT, () => {
  console.log("Comments server Listening on ", COMMENTS_PORT);
});
