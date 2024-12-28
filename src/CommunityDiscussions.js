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


import React, { useState } from 'react';
import './Discussion.css';

const CommunityDiscussions = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "How to implement async/await in React?",
      author: "devUser123",
      content: "I'm trying to fetch data using async/await within useEffect, but I'm getting errors. Here's my code...",
      votes: 15,
      replies: [
        {
          id: 1,
          author: "seniorDev",
          content: "You should wrap your async code in an IIFE. Here's an example...",
          votes: 8,
          isAnswer: true
        }
      ],
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "How to optimize React performance?",
      author: "coderGuy456",
      content: "I am having performance issues with my React app. Any tips on how to optimize the performance?",
      votes: 10,
      replies: [
        {
          id: 1,
          author: "techGuru789",
          content: "You can use React.memo and useCallback to optimize your components. Also, lazy loading components is helpful.",
          votes: 5,
          isAnswer: false
        }
      ],
      timestamp: "1 day ago"
    },
    {
      id: 3,
      title: "What is the best way to manage state in React?",
      author: "reactExpert112",
      content: "I’ve tried useState, but I’m considering using Redux or Context API. Which one do you think is better for state management?",
      votes: 22,
      replies: [
        {
          id: 1,
          author: "reduxFan",
          content: "Redux is great for large-scale applications. Context API is simpler and works well for smaller apps.",
          votes: 14,
          isAnswer: true
        },
        {
          id: 2,
          author: "contextAdvocate",
          content: "I would recommend Context API for smaller apps, it’s simpler and does not require boilerplate code like Redux.",
          votes: 5,
          isAnswer: false
        }
      ],
      timestamp: "3 days ago"
    },
    {
      id: 4,
      title: "How to handle authentication in React?",
      author: "frontEndDev",
      content: "Can anyone suggest the best way to handle user authentication in React? Should I use Firebase or something custom?",
      votes: 12,
      replies: [
        {
          id: 1,
          author: "securityExpert",
          content: "Using Firebase is the easiest and fastest solution. However, building a custom solution gives you more control.",
          votes: 7,
          isAnswer: false
        },
        {
          id: 2,
          author: "customSolutionFan",
          content: "If you need a more secure solution, I would suggest building your own authentication flow using JWT and Express.",
          votes: 4,
          isAnswer: true
        }
      ],
      timestamp: "1 week ago"
    },
    {
      id: 5,
      title: "How to implement drag-and-drop in React?",
      author: "dragMaster",
      content: "What’s the easiest way to implement drag-and-drop functionality in a React app? Should I use a library like react-dnd?",
      votes: 18,
      replies: [
        {
          id: 1,
          author: "uiDesigner",
          content: "You can use react-beautiful-dnd. It’s simple to integrate and provides smooth drag-and-drop functionality.",
          votes: 9,
          isAnswer: true
        },
        {
          id: 2,
          author: "reactDev101",
          content: "I would recommend react-dnd if you need more flexibility and control over the drag-and-drop behavior.",
          votes: 7,
          isAnswer: false
        }
      ],
      timestamp: "2 days ago"
    },
    {
      id: 6,
      title: "How to set up Redux in a new React project?",
      author: "reduxBeginner",
      content: "I’m new to Redux. Can someone guide me through setting up Redux in a new React project?",
      votes: 5,
      replies: [
        {
          id: 1,
          author: "reduxExpert",
          content: "First, install Redux and React-Redux. Then, create a store and wrap your app with the Provider component.",
          votes: 4,
          isAnswer: true
        },
        {
          id: 2,
          author: "reactNovice",
          content: "It’s pretty straightforward. You can follow the official documentation, it has a step-by-step guide on how to set it up.",
          votes: 2,
          isAnswer: false
        }
      ],
      timestamp: "1 day ago"
    },
  ]);

  const [replyInputs, setReplyInputs] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

  const handleNewDiscussion = (e) => {
    e.preventDefault();
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;

    const discussion = {
      id: threads.length + 1,
      title: newDiscussion.title,
      content: newDiscussion.content,
      author: "currentUser",
      votes: 0,
      replies: [],
      timestamp: "Just now",
    };

    setThreads([discussion, ...threads]);
    setNewDiscussion({ title: '', content: '' });
    setShowNewDiscussion(false);
  };

  const handleVote = (threadId, replyId = null, isUpvote) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          if (replyId === null) {
            return { ...thread, votes: thread.votes + (isUpvote ? 1 : -1) };
          }
          return {
            ...thread,
            replies: thread.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, votes: reply.votes + (isUpvote ? 1 : -1) }
                : reply
            ),
          };
        }
        return thread;
      })
    );
  };

  const handleNewReply = (threadId) => {
    if (!replyInputs[threadId]?.trim()) return;

    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              replies: [
                ...thread.replies,
                {
                  id: thread.replies.length + 1,
                  author: "currentUser",
                  content: replyInputs[threadId],
                  votes: 0,
                  isAnswer: false,
                },
              ],
            }
          : thread
      )
    );

    setReplyInputs((prev) => ({ ...prev, [threadId]: '' }));
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
        <div key={thread.id} className="discussion-card">
          <div
            className="discussion-header"
            onClick={() => toggleRepliesVisibility(thread.id)}
          >
            <h2>{thread.title}</h2>
            <div className="discussion-meta">
              <span>{thread.author}</span>
              <span>{thread.timestamp}</span>
            </div>
          </div>

          <p className="discussion-content">{thread.content}</p>

          <div className="voting-section">
            <button onClick={() => handleVote(thread.id, null, true)}>👍</button>
            <span>{thread.votes}</span>
            <button onClick={() => handleVote(thread.id, null, false)}>👎</button>
          </div>

          {visibleReplies[thread.id] && (
            <div className="replies-section">
              <h3>Replies</h3>
              {thread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`reply-card ${reply.isAnswer ? 'best-answer' : ''}`}
                >
                  <div className="reply-header">
                    <span className="reply-author">{reply.author}</span>
                    {reply.isAnswer && <span className="answer-badge">Best Answer</span>}
                  </div>
                  <p className="reply-content">{reply.content}</p>
                  <div className="voting-section">
                    <button
                      onClick={() => handleVote(thread.id, reply.id, true)}
                    >
                      👍
                    </button>
                    <span>{reply.votes}</span>
                    <button
                      onClick={() => handleVote(thread.id, reply.id, false)}
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
              value={replyInputs[thread.id] || ''}
              onChange={(e) => handleInputChange(thread.id, e.target.value)}
              placeholder="Write your reply..."
            />
            <button onClick={() => handleNewReply(thread.id)} className="submit-btn">
              Post Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityDiscussions;