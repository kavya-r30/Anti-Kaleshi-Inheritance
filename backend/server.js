const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true, 
  })
);

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://AntiKaleshi:Kaleshi123@DiscussionForum.cfvfm.mongodb.net/discussionForum?retryWrites=true&w=majority&appName=CodingDashboard"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

const threadSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  votes: Number,
  replies: [
    {
      author: String,
      content: String,
      votes: Number,
      isAnswer: Boolean,
    },
  ],
  timestamp: String,
});

const Thread = mongoose.model("Thread", threadSchema);

app.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (err) {
    console.error("Error fetching threads:", err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

app.post("/threads", async (req, res) => {
  try {
    const newThread = new Thread(req.body);
    await newThread.save();
    res.json(newThread);
  } catch (err) {
    console.error("Error creating thread:", err);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

app.put("/threads/:id", async (req, res) => {
  try {
    const updatedThread = await Thread.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedThread);
  } catch (err) {
    console.error("Error updating thread:", err);
    res.status(500).json({ error: "Failed to update thread" });
  }
});

app.patch("/threads/:id/vote", async (req, res) => {
  const { replyId, isUpvote } = req.body;
  try {
    const thread = await Thread.findById(req.params.id);
    if (replyId) {
      const reply = thread.replies.id(replyId);
      if (isUpvote) {
        reply.votes += 1;
      } else {
        reply.votes -= 1;
      }
    } else {
      if (isUpvote) {
        thread.votes += 1;
      } else {
        thread.votes -= 1;
      }
    }
    await thread.save();
    res.json(thread);
  } catch (err) {
    console.error("Error voting:", err);
    res.status(500).json({ error: "Failed to update vote" });
  }
});

app.post("/threads/:id/replies", async (req, res) => {
  const { author, content, votes = 0, isAnswer = false } = req.body;
  try {
    const thread = await Thread.findById(req.params.id);
    const newReply = { author, content, votes, isAnswer };
    thread.replies.push(newReply);
    await thread.save();
    res.json(thread);
  } catch (err) {
    console.error("Error posting reply:", err);
    res.status(500).json({ error: "Failed to post reply" });
  }
});

app.patch("/threads/:id/replies/:replyId/answer", async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    const reply = thread.replies.id(req.params.replyId);
    thread.replies.forEach((r) => (r.isAnswer = false));
    reply.isAnswer = true;
    await thread.save();
    res.json(thread);
  } catch (err) {
    console.error("Error marking reply as best answer:", err);
    res.status(500).json({ error: "Failed to mark reply as best answer" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));