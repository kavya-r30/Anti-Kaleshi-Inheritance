import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

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
      author: "User",
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
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
            onClick={() => setShowNewDiscussion(true)}
          >
            + New Discussion
          </button>
        </div>

        {showNewDiscussion && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-purple-100">
            <h2 className="text-2xl font-bold mb-6 text-purple-900">Start a New Discussion</h2>
            <form onSubmit={handleNewDiscussion}>
              <input
                type="text"
                placeholder="Discussion Title"
                value={newDiscussion.title}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, title: e.target.value })
                }
                className="w-full p-3 mb-4 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <textarea
                placeholder="What would you like to discuss?"
                value={newDiscussion.content}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, content: e.target.value })
                }
                className="w-full p-3 mb-4 border border-purple-200 rounded-lg h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
                >
                  Post Discussion
                </button>
                <button
                  type="button"
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-semibold"
                  onClick={() => setShowNewDiscussion(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {threads.map((thread) => (
          <div key={thread._id} className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-purple-100">
            <div className="p-6 border-b border-purple-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-purple-900 mb-2">{thread.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium">{thread.author}</span>
                    <span>•</span>
                    <span>{new Date(thread.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleRepliesVisibility(thread._id)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  {visibleReplies[thread._id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
              </div>

              <p className="text-gray-700 leading-relaxed">{thread.content}</p>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote(thread._id, null, true)}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <ThumbsUp size={20} />
                  </button>
                  <span className="font-medium">{thread.votes}</span>
                  <button
                    onClick={() => handleVote(thread._id, null, false)}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <ThumbsDown size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare size={20} />
                  <span>{thread.replies.length} replies</span>
                </div>
              </div>
            </div>

            {visibleReplies[thread._id] && (
              <div className="bg-purple-50/50 p-6">
                <h3 className="text-lg font-bold mb-4 text-purple-900">Replies</h3>
                <div className="space-y-4">
                  {thread.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className={`p-4 rounded-lg ${
                        reply.isAnswer
                          ? "bg-green-50 border border-green-200"
                          : "bg-white border border-purple-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{reply.author}</span>
                          {reply.isAnswer && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                              Best Answer
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{reply.content}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVote(thread._id, reply._id, true)}
                          className="text-gray-500 hover:text-purple-600 transition-colors"
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <span className="text-sm font-medium">{reply.votes}</span>
                        <button
                          onClick={() => handleVote(thread._id, reply._id, false)}
                          className="text-gray-500 hover:text-purple-600 transition-colors"
                        >
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <textarea
                    value={replyInputs[thread._id] || ""}
                    onChange={(e) => handleInputChange(thread._id, e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                  />
                  <button
                    onClick={() => handleNewReply(thread._id)}
                    className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityDiscussions;