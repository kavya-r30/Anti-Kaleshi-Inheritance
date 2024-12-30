import React, { useState } from 'react';
import './Career.css';

const Career = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "How do I get my first job as a software developer?",
      author: "techNewbie",
      content: "I am fresh out of college and looking to land my first job as a software developer. Any tips or resources for someone starting from scratch?",
      votes: 25,
      replies: [
        {
          id: 1,
          author: "experiencedDev",
          content: "Start with building projects and contributing to open-source. It's important to showcase your work on GitHub. Also, try networking on LinkedIn.",
          votes: 15,
          isAnswer: true
        },
        {
          id: 2,
          author: "careerCoach",
          content: "Don’t underestimate the power of a strong resume and a well-written cover letter. Apply to junior developer roles and be persistent!",
          votes: 7,
          isAnswer: false
        }
      ],
      timestamp: "2 days ago"
    },
    {
      id: 2,
      title: "What are the best career growth strategies for a developer?",
      author: "growthSeeker",
      content: "I’ve been working as a software developer for a couple of years now, but I want to take my career to the next level. What should I focus on?",
      votes: 30,
      replies: [
        {
          id: 1,
          author: "seniorDevLeader",
          content: "Focus on mastering one stack and then branch out into others. Also, working on your soft skills (communication, leadership) will make a big difference.",
          votes: 18,
          isAnswer: true
        },
        {
          id: 2,
          author: "techSpecialist",
          content: "Don’t forget to constantly learn! Whether it's new languages, frameworks, or certifications, keeping your skills updated is essential for career progression.",
          votes: 10,
          isAnswer: false
        }
      ],
      timestamp: "1 week ago"
    },
    {
      id: 3,
      title: "Is it worth getting a Master's degree for software engineering?",
      author: "gradQuestioner",
      content: "I’m considering going for a Master’s in Software Engineering, but I’m not sure if it's worth it. Will it really help with my career?",
      votes: 18,
      replies: [
        {
          id: 1,
          author: "degreeAdvocate",
          content: "It depends on your career goals. A Master’s can open doors for higher-level roles and specialized fields like AI or cybersecurity.",
          votes: 8,
          isAnswer: true
        },
        {
          id: 2,
          author: "industryExpert",
          content: "In tech, experience and projects often matter more than a degree. If you're looking to learn new skills, online courses or bootcamps might be a better investment.",
          votes: 7,
          isAnswer: false
        }
      ],
      timestamp: "3 days ago"
    },
    {
      id: 4,
      title: "How can I make the transition from front-end to full-stack development?",
      author: "frontEndDev",
      content: "I have been working as a front-end developer for a few years now, and I'm interested in learning back-end technologies. How should I go about making the transition?",
      votes: 22,
      replies: [
        {
          id: 1,
          author: "fullStackGuru",
          content: "Start learning server-side languages like Node.js or Python. Learn about databases, REST APIs, and how the back-end works with the front-end.",
          votes: 12,
          isAnswer: true
        },
        {
          id: 2,
          author: "backEndExpert",
          content: "Understand the fundamentals of HTTP, databases (SQL/NoSQL), and learn about cloud platforms like AWS or Azure. You'll be a full-stack developer in no time.",
          votes: 8,
          isAnswer: false
        }
      ],
      timestamp: "5 days ago"
    },
    {
      id: 5,
      title: "What are the best resources for preparing for coding interviews?",
      author: "interviewPrep",
      content: "I have a few upcoming coding interviews. Can anyone recommend the best books, websites, or strategies for preparing for them?",
      votes: 35,
      replies: [
        {
          id: 1,
          author: "interviewExpert",
          content: "Cracking the Coding Interview by Gayle Laakmann McDowell is a great book. Also, practice on platforms like LeetCode, HackerRank, or CodeSignal.",
          votes: 20,
          isAnswer: true
        },
        {
          id: 2,
          author: "devStudent",
          content: "Don’t forget to review data structures and algorithms! Work on coding problems daily, and you’ll see significant improvement.",
          votes: 10,
          isAnswer: false
        }
      ],
      timestamp: "1 week ago"
    },
    {
      id: 6,
      title: "How do I stay motivated when learning to code?",
      author: "newCoder",
      content: "I’ve been learning to code for a few months, but I’m losing motivation. Any tips on how to stay focused and motivated?",
      votes: 15,
      replies: [
        {
          id: 1,
          author: "codingCoach",
          content: "Set small, achievable goals. Break down big problems into smaller ones. Celebrate your wins, no matter how small!",
          votes: 10,
          isAnswer: true
        },
        {
          id: 2,
          author: "devMentor",
          content: "Join coding communities like GitHub, Stack Overflow, or Discord. It helps to interact with others who share similar goals.",
          votes: 5,
          isAnswer: false
        }
      ],
      timestamp: "2 days ago"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Function to add a new question to the threads list
  const handleAddQuestion = () => {
    if (newQuestion.trim() && newDescription.trim()) {
      setThreads(prevThreads => [
        {
          id: prevThreads.length + 1,
          title: newQuestion,
          content: newDescription,
          author: "Current User",
          votes: 0,
          replies: [],
          timestamp: "Just now",
          showReplies: false // Default to hidden
        },
        ...prevThreads
      ]);
      setNewQuestion('');
      setNewDescription('');
      setShowForm(false);
    }
  };

  // Function to handle voting (upvote or downvote)
  const handleVote = (threadId, replyId = null, isUpvote) => {
    setThreads(prevThreads => {
      return prevThreads.map(thread => {
        if (thread.id === threadId) {
          if (replyId === null) {
            return {
              ...thread,
              votes: thread.votes + (isUpvote ? 1 : -1)
            };
          } else {
            return {
              ...thread,
              replies: thread.replies.map(reply => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    votes: reply.votes + (isUpvote ? 1 : -1)
                  };
                }
                return reply;
              })
            };
          }
        }
        return thread;
      });
    });
  };

  // Function to handle changes in the reply form input
  const handleInputChange = (threadId, event) => {
    const { value } = event.target;
    setThreads(prevThreads => {
      return prevThreads.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            newReply: value
          };
        }
        return thread;
      });
    });
  };

  // Function to add a new reply to a specific thread
  const handleNewReply = (threadId) => {
    const thread = threads.find(thread => thread.id === threadId);
    if (thread.newReply) {
      const newReply = {
        id: thread.replies.length + 1,
        author: "Current User",
        content: thread.newReply,
        votes: 0,
        isAnswer: false
      };
      setThreads(prevThreads => {
        return prevThreads.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              replies: [...t.replies, newReply],
              newReply: '' // Clear the reply input after adding the reply
            };
          }
          return t;
        });
      });
    }
  };

  // Function to toggle the visibility of replies when a thread is clicked
  const toggleReplies = (threadId) => {
    setThreads(prevThreads => {
      return prevThreads.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            showReplies: !thread.showReplies // Toggle visibility
          };
        }
        return thread;
      });
    });
  };

  return (
    <div className="discussion-container">
      <button
        className="new-question-btn"
        onClick={() => setShowForm(!showForm)}
      >
        + New Question
      </button>

      {showForm && (
        <div className="new-question-form">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter your question here..."
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter your question description..."
        />
        <button
          style={{
            backgroundColor: '#f0f0f0', // Grey color
            color: 'black',
            padding: '12px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onClick={handleAddQuestion}
        >
          Post Question
        </button>
        <button
          style={{
            backgroundColor: '#6c757d', // Grey color
            color: 'black',
            padding: '12px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
         
      )}

      {threads.map(thread => (
        <div key={thread.id} className="discussion-card">
          <div className="discussion-header" onClick={() => toggleReplies(thread.id)}>
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

          {/* Display replies only if showReplies is true */}
          {thread.showReplies && (
            <div className="replies-section">
              <h3>Replies</h3>
              {thread.replies.map(reply => (
                <div key={reply.id} className={`reply-card ${reply.isAnswer ? 'best-answer' : ''}`}>
                  <div className="reply-header">
                    <span className="reply-author">{reply.author}</span>
                    {reply.isAnswer && <span className="answer-badge">Best Answer</span>}
                  </div>
                  <p className="reply-content">{reply.content}</p>
                  <div className="voting-section">
                    <button onClick={() => handleVote(thread.id, reply.id, true)}>👍</button>
                    <span>{reply.votes}</span>
                    <button onClick={() => handleVote(thread.id, reply.id, false)}>👎</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="reply-form">
            <textarea
              value={thread.newReply || ''}
              onChange={(e) => handleInputChange(thread.id, e)}
              placeholder="Write your reply..."
            />
            <button onClick={() => handleNewReply(thread.id)}>Post Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Career;

// import React, { useState } from 'react';
// import './Career.css';

// const Career = () => {
//   const [threads, setThreads] = useState([
//     {
//       id: 1,
//       title: "How do I get my first job as a software developer?",
//       author: "techNewbie",
//       content: "I am fresh out of college and looking to land my first job as a software developer. Any tips or resources for someone starting from scratch?",
//       votes: 25,
//       replies: [
//         {
//           id: 1,
//           author: "experiencedDev",
//           content: "Start with building projects and contributing to open-source. It's important to showcase your work on GitHub. Also, try networking on LinkedIn.",
//           votes: 15,
//           isAnswer: true
//         },
//         {
//           id: 2,
//           author: "careerCoach",
//           content: "Don’t underestimate the power of a strong resume and a well-written cover letter. Apply to junior developer roles and be persistent!",
//           votes: 7,
//           isAnswer: false
//         }
//       ],
//       timestamp: "2 days ago"
//     },
//     {
//       id: 2,
//       title: "What are the best career growth strategies for a developer?",
//       author: "growthSeeker",
//       content: "I’ve been working as a software developer for a couple of years now, but I want to take my career to the next level. What should I focus on?",
//       votes: 30,
//       replies: [
//         {
//           id: 1,
//           author: "seniorDevLeader",
//           content: "Focus on mastering one stack and then branch out into others. Also, working on your soft skills (communication, leadership) will make a big difference.",
//           votes: 18,
//           isAnswer: true
//         },
//         {
//           id: 2,
//           author: "techSpecialist",
//           content: "Don’t forget to constantly learn! Whether it's new languages, frameworks, or certifications, keeping your skills updated is essential for career progression.",
//           votes: 10,
//           isAnswer: false
//         }
//       ],
//       timestamp: "1 week ago"
//     },
//     {
//       id: 3,
//       title: "Is it worth getting a Master's degree for software engineering?",
//       author: "gradQuestioner",
//       content: "I’m considering going for a Master’s in Software Engineering, but I’m not sure if it's worth it. Will it really help with my career?",
//       votes: 18,
//       replies: [
//         {
//           id: 1,
//           author: "degreeAdvocate",
//           content: "It depends on your career goals. A Master’s can open doors for higher-level roles and specialized fields like AI or cybersecurity.",
//           votes: 8,
//           isAnswer: true
//         },
//         {
//           id: 2,
//           author: "industryExpert",
//           content: "In tech, experience and projects often matter more than a degree. If you're looking to learn new skills, online courses or bootcamps might be a better investment.",
//           votes: 7,
//           isAnswer: false
//         }
//       ],
//       timestamp: "3 days ago"
//     },
//     {
//       id: 4,
//       title: "How can I make the transition from front-end to full-stack development?",
//       author: "frontEndDev",
//       content: "I have been working as a front-end developer for a few years now, and I'm interested in learning back-end technologies. How should I go about making the transition?",
//       votes: 22,
//       replies: [
//         {
//           id: 1,
//           author: "fullStackGuru",
//           content: "Start learning server-side languages like Node.js or Python. Learn about databases, REST APIs, and how the back-end works with the front-end.",
//           votes: 12,
//           isAnswer: true
//         },
//         {
//           id: 2,
//           author: "backEndExpert",
//           content: "Understand the fundamentals of HTTP, databases (SQL/NoSQL), and learn about cloud platforms like AWS or Azure. You'll be a full-stack developer in no time.",
//           votes: 8,
//           isAnswer: false
//         }
//       ],
//       timestamp: "5 days ago"
//     },
//     {
//       id: 5,
//       title: "What are the best resources for preparing for coding interviews?",
//       author: "interviewPrep",
//       content: "I have a few upcoming coding interviews. Can anyone recommend the best books, websites, or strategies for preparing for them?",
//       votes: 35,
//       replies: [
//         {
//           id: 1,
//           author: "interviewExpert",
//           content: "Cracking the Coding Interview by Gayle Laakmann McDowell is a great book. Also, practice on platforms like LeetCode, HackerRank, or CodeSignal.",
//           votes: 20,
//           isAnswer: true
//         },
//         {
//           id: 2,
//           author: "devStudent",
//           content: "Don’t forget to review data structures and algorithms! Work on coding problems daily, and you’ll see significant improvement.",
//           votes: 10,
//           isAnswer: false
//         }
//       ],
//       timestamp: "1 week ago"
//     },
//     {
//       id: 6,
//       title: "How do I stay motivated when learning to code?",
//       author: "newCoder",
//       content: "I’ve been learning to code for a few months, but I’m losing motivation. Any tips on how to stay focused and motivated?",
//       votes: 15,
//       replies: [
//         {
//           id: 1,
//           author: "codingCoach",
//           content: "Set small, achievable goals. Break down big problems into smaller ones. Celebrate your wins, no matter how small!",
//           votes: 10,
//           isAnswer: true
//         },
//         {
//           id: 2,
//           author: "devMentor",
//           content: "Join coding communities like GitHub, Stack Overflow, or Discord. It helps to interact with others who share similar goals.",
//           votes: 5,
//           isAnswer: false
//         }
//       ],
//       timestamp: "2 days ago"
//     }
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [newDescription, setNewDescription] = useState('');

//   const handleAddQuestion = () => {
//     if (newQuestion.trim() && newDescription.trim()) {
//       setThreads(prevThreads => [
//         {
//           id: prevThreads.length + 1,
//           title: newQuestion,
//           description: newDescription,
//           author: "Current User",
//           votes: 0,
//           replies: [],
//           timestamp: "Just now"
//         },
//         ...prevThreads
//       ]);
//       setNewQuestion('');
//       setNewDescription('');
//       setShowForm(false);
//     }
//   };

//   return (
//     <div className="career-container">
//       <div className="career-main-content">
//         <button
//           className="career-new-discussion-btn"
//           onClick={() => setShowForm(!showForm)}
//         >
//           + New Question
//         </button>

//         {showForm && (
//           <div className="career-new-discussion-form">
//             <input
//               type="text"
//               value={newQuestion}
//               onChange={(e) => setNewQuestion(e.target.value)}
//               placeholder="Enter your question here..."
//               className="form-input"
//             />
//             <textarea
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               placeholder="Enter your question description..."
//               className="form-textarea"
//             />
//             <div className="form-actions">
//               <button
//                 className="career-post-discussion-btn"
//                 onClick={handleAddQuestion}
//               >
//                 Post Question
//               </button>
//               <button
//                 className="career-cancel-btn"
//                 onClick={() => setShowForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {threads.map(thread => (
//           <div key={thread.id} className="career-discussion-card">
//             <div className="career-discussion-header">
//               <h2>{thread.title}</h2>
//               <div className="career-discussion-meta">
//                 <span>{thread.author}</span>
//                 <span>{thread.timestamp}</span>
//               </div>
//             </div>
//             <p className="career-discussion-content">{thread.content}</p>
//             <div className="career-voting-section">
//               <button>👍</button>
//               <span>{thread.votes}</span>
//               <button>👎</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Career;
