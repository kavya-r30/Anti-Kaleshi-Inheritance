// import React, { useState } from 'react';
// import './Discussion.css';

// const CommunityDiscussions = () => {
//   const [threads, setThreads] = useState([
//     {
//       id: 1,
//       title: "How to implement async/await in React?",
//       author: "devUser123",
//       content: "I'm trying to fetch data using async/await within useEffect, but I'm getting errors. Here's my code...",
//       votes: 15,
//       replies: [
//         {
//           id: 1,
//           author: "seniorDev",
//           content: "You should wrap your async code in an IIFE. Here's an example...",
//           votes: 8,
//           isAnswer: true
//         }
//       ],
//       timestamp: "2 hours ago"
//     },
//     {
//       id: 2,
//       title: "How to optimize React performance?",
//       author: "coderGuy456",
//       content: "I am having performance issues with my React app. Any tips on how to optimize the performance?",
//       votes: 10,
//       replies: [
//         {
//           id: 1,
//           author: "techGuru789",
//           content: "You can use React.memo and useCallback to optimize your components. Also, lazy loading components is helpful.",
//           votes: 5,
//           isAnswer: false
//         }
//       ],
//       timestamp: "1 day ago"
//     },
//     {
//       id: 3,
//       title: "What is the best way to manage state in React?",
//       author: "reactExpert112",
//       content: "I’ve tried useState, but I’m considering using Redux or Context API. Which one do you think is better for state management?",
//       votes: 22,
//       replies: [],
//       timestamp: "3 days ago"
//     },
//     {
//       id: 4,
//       title: "How to handle authentication in React?",
//       author: "frontEndDev",
//       content: "Can anyone suggest the best way to handle user authentication in React? Should I use Firebase or something custom?",
//       votes: 12,
//       replies: [],
//       timestamp: "1 week ago"
//     }
//   ]);

//   const [newReply, setNewReply] = useState("");
//   const [visibleReplies, setVisibleReplies] = useState({});

//   const handleVote = (threadId, replyId = null, isUpvote) => {
//     setThreads(prevThreads => {
//       return prevThreads.map(thread => {
//         if (thread.id === threadId) {
//           if (replyId === null) {
//             return {
//               ...thread,
//               votes: thread.votes + (isUpvote ? 1 : -1)
//             };
//           } else {
//             return {
//               ...thread,
//               replies: thread.replies.map(reply => {
//                 if (reply.id === replyId) {
//                   return {
//                     ...reply,
//                     votes: reply.votes + (isUpvote ? 1 : -1)
//                   };
//                 }
//                 return reply;
//               })
//             };
//           }
//         }
//         return thread;
//       });
//     });
//   };

//   const handleNewReply = (threadId) => {
//     if (!newReply.trim()) return;

//     setThreads(prevThreads => {
//       return prevThreads.map(thread => {
//         if (thread.id === threadId) {
//           return {
//             ...thread,
//             replies: [...thread.replies, {
//               id: thread.replies.length + 1,
//               author: "currentUser",
//               content: newReply,
//               votes: 0,
//               isAnswer: false
//             }]
//           };
//         }
//         return thread;
//       });
//     });
//     setNewReply("");
//   };

//   const toggleRepliesVisibility = (threadId) => {
//     setVisibleReplies(prev => ({
//       ...prev,
//       [threadId]: !prev[threadId]
//     }));
//   };

//   return (
//     <div className="discussion-container">
//       {threads.map(thread => (
//         <div key={thread.id} className="discussion-card">
//           <div className="discussion-header" onClick={() => toggleRepliesVisibility(thread.id)}>
//             <h2>{thread.title}</h2>
//             <div className="discussion-meta">
//               <span>{thread.author}</span>
//               <span>{thread.timestamp}</span>
//             </div>
//           </div>

//           <p className="discussion-content">{thread.content}</p>

//           <div className="voting-section">
//             <button onClick={() => handleVote(thread.id, null, true)}>👍</button>
//             <span>{thread.votes}</span>
//             <button onClick={() => handleVote(thread.id, null, false)}>👎</button>
//           </div>

//           {visibleReplies[thread.id] && (
//             <div className="replies-section">
//               <h3>Replies</h3>
//               {thread.replies.map(reply => (
//                 <div key={reply.id} className={`reply-card ${reply.isAnswer ? 'best-answer' : ''}`}>
//                   <div className="reply-header">
//                     <span className="reply-author">{reply.author}</span>
//                     {reply.isAnswer && <span className="answer-badge">Best Answer</span>}
//                   </div>
//                   <p className="reply-content">{reply.content}</p>
//                   <div className="voting-section">
//                     <button onClick={() => handleVote(thread.id, reply.id, true)}>👍</button>
//                     <span>{reply.votes}</span>
//                     <button onClick={() => handleVote(thread.id, reply.id, false)}>👎</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="reply-form">
//             <textarea
//               value={newReply}
//               onChange={(e) => setNewReply(e.target.value)}
//               placeholder="Write your reply..."
//             />
//             <button onClick={() => handleNewReply(thread.id)}>Post Reply</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CommunityDiscussions;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Discussion.css";

const API_URL = "http://localhost:5000/threads";

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
      author: "currentUser ",
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
      author: "currentUser ",
      content: replyInputs[threadId],
      votes: 0,
      isAnswer: false,
    };

    try {
      const response = await axios.post(
        `${API_URL}/${threadId}/replies`,
        reply
      );
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
    <div className="discussion-container">
      <div className="discussions-header">
        <button
          className="new-discussion-btn"
          onClick={() => setShowNewDiscussion(true)}
        >
          + New Discussion
        </button>
      </div>

      {showNewDiscussion && (
        <div className="new-discussion-form">
          <h2>Start a New Discussion</h2>
          <form onSubmit={handleNewDiscussion}>
            <input
              type="text"
              placeholder="Discussion Title"
              value={newDiscussion.title}
              onChange={(e) =>
                setNewDiscussion({ ...newDiscussion, title: e.target.value })
              }
              className="form-input"
            />
            <textarea
              placeholder="What would you like to discuss?"
              value={newDiscussion.content}
              onChange={(e) =>
                setNewDiscussion({ ...newDiscussion, content: e.target.value })
              }
              className="form-textarea"
            />
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Post Discussion
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowNewDiscussion(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {threads.map((thread) => (
        <div key={thread._id} className="discussion-card">
          <div
            className="discussion-header"
            onClick={() => toggleRepliesVisibility(thread._id)}
          >
            <h2>{thread.title}</h2>
            <div className="discussion-meta">
              <span>{thread.author}</span>
              <span>{new Date(thread.timestamp).toLocaleString()}</span>
            </div>
          </div>

          <p className="discussion-content">{thread.content}</p>

          <div className="voting-section">
            <button onClick={() => handleVote(thread._id, null, true)}>
              👍
            </button>
            <span>{thread.votes}</span>
            <button onClick={() => handleVote(thread._id, null, false)}>
              👎
            </button>
          </div>

          {visibleReplies[thread._id] && (
            <div className="replies-section">
              <h3>Replies</h3>
              {thread.replies.map((reply) => (
                <div
                  key={reply._id}
                  className={`reply-card ${
                    reply.isAnswer ? "best-answer" : ""
                  }`}
                >
                  <div className="reply-header">
                    <span className="reply-author">{reply.author}</span>
                    {reply.isAnswer && (
                      <span className="answer-badge">Best Answer</span>
                    )}
                  </div>
                  <p className="reply-content">{reply.content}</p>
                  <div className="voting-section">
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

          <div className="reply-form">
            <textarea
              value={replyInputs[thread._id] || ""}
              onChange={(e) => handleInputChange(thread._id, e.target.value)}
              placeholder="Write your reply..."
            />
            <button
              onClick={() => handleNewReply(thread._id)}
              className="submit-btn"
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