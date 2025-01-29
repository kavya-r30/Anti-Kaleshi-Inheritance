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
    "mongodb+srv://AntiKaleshi:Swayam@DiscussionForum.cfvfm.mongodb.net/discussionForum?retryWrites=true&w=majority&appName=CodingDashboard"
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

// Career
const QuestionSchema = new mongoose.Schema({
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

const Thread = mongoose.model("Thread", threadSchema, "comm");
// Career
const Question = mongoose.model("Question", QuestionSchema, "career");

app.get("/comm", async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (err) {
    console.error("Error fetching threads:", err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Career
app.get("/career", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

app.post("/comm", async (req, res) => {
  try {
    const newThread = new Thread(req.body);
    await newThread.save();
    res.json(newThread);
  } catch (err) {
    console.error("Error creating thread:", err);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Career
app.post("/career", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.json(newQuestion);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Failed to create question" });
  }
});

app.put("/comm/:id", async (req, res) => {
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

// Career
app.put("/career/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (err) {
    console.error("Error updating qst:", err);
    res.status(500).json({ error: "Failed to update qst" });
  }
});

app.patch("/comm/:id/vote", async (req, res) => {
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

    const maxVoteReply = thread.replies.reduce(
      (max, reply) => (reply.votes > max.votes ? reply : max),
      { votes: -Infinity }
    );

    thread.replies.forEach((reply) => {
      reply.isAnswer = reply._id.equals(maxVoteReply._id);
    });

    await thread.save();
    res.json(thread);
  } catch (err) {
    console.error("Error voting:", err);
    res.status(500).json({ error: "Failed to update vote" });
  }
});

// Career
app.patch("/career/:id/vote", async (req, res) => {
  const { replyId, isUpvote } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    if (replyId) {
      const reply = question.replies.id(replyId);
      if (isUpvote) {
        reply.votes += 1;
      } else {
        reply.votes -= 1;
      }
    } else {
      if (isUpvote) {
        question.votes += 1;
      } else {
        question.votes -= 1;
      }
    }

    const maxVoteReply = question.replies.reduce(
      (max, reply) => (reply.votes > max.votes ? reply : max),
      { votes: -Infinity }
    );

    question.replies.forEach((reply) => {
      reply.isAnswer = reply._id.equals(maxVoteReply._id);
    });

    await question.save();
    res.json(question);
  } catch (err) {
    console.error("Error voting:", err);
    res.status(500).json({ error: "Failed to update vote" });
  }
});

app.post("/comm/:id/replies", async (req, res) => {
  const { author, content, votes = 0, isAnswer = false } = req.body;
  try {
    const thread = await Thread.findById(req.params.id);
    const newReply = { author, content, votes, isAnswer };
    thread.replies.push(newReply);

    const maxVoteReply = thread.replies.reduce(
      (max, reply) => (reply.votes > max.votes ? reply : max),
      { votes: -Infinity }
    );

    thread.replies.forEach((reply) => {
      reply.isAnswer = reply._id.equals(maxVoteReply._id);
    });

    await thread.save();
    res.json(thread);
  } catch (err) {
    console.error("Error posting reply:", err);
    res.status(500).json({ error: "Failed to post reply" });
  }
});
// Career
app.post("/career/:id/replies", async (req, res) => {
  const { author, content, votes = 0, isAnswer = false } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    const newReply = { author, content, votes, isAnswer };
    question.replies.push(newReply);

    const maxVoteReply = question.replies.reduce(
      (max, reply) => (reply.votes > max.votes ? reply : max),
      { votes: -Infinity }
    );

    question.replies.forEach((reply) => {
      reply.isAnswer = reply._id.equals(maxVoteReply._id);
    });

    await question.save();
    res.json(question);
  } catch (err) {
    console.error("Error posting reply:", err);
    res.status(500).json({ error: "Failed to post reply" });
  }
});

app.patch("/comm/:id/replies/:replyId/answer", async (req, res) => {
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

// Career
app.patch("/career/:id/replies/:replyId/answer", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const reply = question.replies.id(req.params.replyId);
    question.replies.forEach((r) => (r.isAnswer = false));
    reply.isAnswer = true;
    await question.save();
    res.json(question);
  } catch (err) {
    console.error("Error marking reply as best answer:", err);
    res.status(500).json({ error: "Failed to mark reply as best answer" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
