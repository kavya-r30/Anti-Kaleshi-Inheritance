import React, { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${backendUrl}/comm`;

const CommunityDiscussions = () => {
  const [threads, setThreads] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(API_URL);
        setThreads(response.data);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, []);

  const handleNewDiscussion = async (e) => {
    e.preventDefault();
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;

    const discussion = {
      title: newDiscussion.title,
      content: newDiscussion.content,
      author: "currentUser",
      votes: 0,
      replies: [],
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(API_URL, discussion);
      setThreads([response.data, ...threads]);
      setNewDiscussion({ title: "", content: "" });
      setShowNewDiscussion(false);
    } catch (error) {
      console.error("Error creating discussion:", error);
    }
  };

  const handleVote = async (threadId, replyId = null, isUpvote) => {
    try {
      const response = await axios.patch(`${API_URL}/${threadId}/vote`, {
        replyId,
        isUpvote,
      });
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === threadId ? response.data : thread
        )
      );
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  const handleNewReply = async (threadId) => {
    if (!replyInputs[threadId]?.trim()) return;

    const reply = {
      author: "currentUser",
      content: replyInputs[threadId],
      votes: 0,
      isAnswer: false,
    };

    try {
      const response = await axios.post(`${API_URL}/${threadId}/replies`, reply);
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === threadId ? response.data : thread
        )
      );
      setReplyInputs((prev) => ({ ...prev, [threadId]: "" }));
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const toggleRepliesVisibility = (threadId) => {
    setVisibleReplies((prev) => ({ ...prev, [threadId]: !prev[threadId] }));
  };

  const handleInputChange = (threadId, value) => {
    setReplyInputs((prev) => ({ ...prev, [threadId]: value }));
  };

  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <div className="mb-6">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          onClick={() => setShowNewDiscussion(true)}
        >
          + New Discussion
        </button>
      </div>

      {showNewDiscussion && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Start a New Discussion</h2>
          <form onSubmit={handleNewDiscussion}>
            <input
              type="text"
              placeholder="Discussion Title"
              value={newDiscussion.title}
              onChange={(e) =>
                setNewDiscussion({ ...newDiscussion, title: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="What would you like to discuss?"
              value={newDiscussion.content}
              onChange={(e) =>
                setNewDiscussion({ ...newDiscussion, content: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Post Discussion
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowNewDiscussion(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {threads.map((thread) => (
        <div key={thread._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div
            className="cursor-pointer"
            onClick={() => toggleRepliesVisibility(thread._id)}
          >
            <h2 className="text-xl font-bold">{thread.title}</h2>
            <div className="text-sm text-gray-600">
              <span>{thread.author}</span>
              <span className="ml-2">
                {new Date(thread.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="mt-4">{thread.content}</p>

          <div className="flex gap-2 mt-4">
            <button onClick={() => handleVote(thread._id, null, true)}>
              👍
            </button>
            <span>{thread.votes}</span>
            <button onClick={() => handleVote(thread._id, null, false)}>
              👎
            </button>
          </div>

          {visibleReplies[thread._id] && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Replies</h3>
              {thread.replies.map((reply) => (
                <div
                  key={reply._id}
                  className={`p-4 rounded-lg ${
                    reply.isAnswer ? "bg-green-50" : "bg-gray-50"
                  } mb-2`}
                >
                  <div className="flex items-center">
                    <span className="font-bold">{reply.author}</span>
                    {reply.isAnswer && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm ml-2">
                        Best Answer
                      </span>
                    )}
                  </div>
                  <p className="mt-2">{reply.content}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleVote(thread._id, reply._id, true)}
                    >
                      👍
                    </button>
                    <span>{reply.votes}</span>
                    <button
                      onClick={() => handleVote(thread._id, reply._id, false)}
                    >
                      👎
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <textarea
              value={replyInputs[thread._id] || ""}
              onChange={(e) => handleInputChange(thread._id, e.target.value)}
              placeholder="Write your reply..."
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => handleNewReply(thread._id)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mt-2"
            >
              Post Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityDiscussions;