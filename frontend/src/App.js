
// import React, { useState } from 'react';
// import './Discussion.css';

// function App() {
//   const [activeTab, setActiveTab] = useState('forum'); // Track the active tab
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
//       title: "What is the difference between var, let, and const?",
//       author: "jsLearner",
//       content: "Can someone explain the difference and use cases of var, let, and const in JavaScript?",
//       votes: 20,
//       replies: [
//         {
//           id: 1,
//           author: "expertDev",
//           content: "var is function-scoped, let and const are block-scoped. const is for values that shouldn't be reassigned.",
//           votes: 5,
//           isAnswer: false
//         }
//       ],
//       timestamp: "1 day ago"
//     }
//   ]);

//   const [newReply, setNewReply] = useState("");
//   const [visibleReplies, setVisibleReplies] = useState({});

//   // Handle the active tab change
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

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

//   // Toggle replies visibility
//   const toggleRepliesVisibility = (threadId) => {
//     setVisibleReplies(prev => ({
//       ...prev,
//       [threadId]: !prev[threadId]
//     }));
//   };

//   // Study Guide Resources
//   const studyGuideResources = {
//     DSA: [
//       { title: "Introduction to DSA", link: "https://example.com/dsa-intro" },
//       { title: "DSA - Arrays and Strings", link: "https://example.com/dsa-arrays" },
//       { title: "DSA - Linked Lists", link: "https://example.com/dsa-linked-lists" }
//     ],
//     Pandas: [
//       { title: "Pandas DataFrame Basics", link: "https://example.com/pandas-basics" },
//       { title: "Advanced Pandas Operations", link: "https://example.com/pandas-advanced" },
//       { title: "Pandas - Data Cleaning", link: "https://example.com/pandas-cleaning" }
//     ]
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Discussion Forum</h1>
//       </header>

//       <div className="tabs">
//         <button
//           className={activeTab === 'forum' ? 'active large-button' : 'large-button'}
//           onClick={() => handleTabChange('forum')}
//         >
//           Community Discussions
//         </button>
//         <button
//           className={activeTab === 'study-guide' ? 'active large-button' : 'large-button'}
//           onClick={() => handleTabChange('study-guide')}
//         >
//           Learning Resources
//         </button>
//       </div>

//       {/* Conditional Rendering for Active Tab */}
//       {activeTab === 'forum' ? (
//         <div className="discussion-container">
//           {threads.map(thread => (
//             <div key={thread.id} className="discussion-card">
//               <div className="discussion-header" onClick={() => toggleRepliesVisibility(thread.id)}>
//                 <h2>{thread.title}</h2>
//                 <div className="discussion-meta">
//                   <span>{thread.author}</span>
//                   <span>{thread.timestamp}</span>
//                 </div>
//               </div>

//               <p className="discussion-content">{thread.content}</p>

//               <div className="voting-section">
//                 <button onClick={() => handleVote(thread.id, null, true)}>👍</button>
//                 <span>{thread.votes}</span>
//                 <button onClick={() => handleVote(thread.id, null, false)}>👎</button>
//               </div>

//               {/* Conditionally render replies section */}
//               {visibleReplies[thread.id] && (
//                 <div className="replies-section">
//                   <h3>Replies</h3>
//                   {thread.replies.map(reply => (
//                     <div key={reply.id} className={`reply-card ${reply.isAnswer ? 'best-answer' : ''}`}>
//                       <div className="reply-header">
//                         <span className="reply-author">{reply.author}</span>
//                         {reply.isAnswer && <span className="answer-badge">Best Answer</span>}
//                       </div>
//                       <p className="reply-content">{reply.content}</p>
//                       <div className="voting-section">
//                         <button onClick={() => handleVote(thread.id, reply.id, true)}>👍</button>
//                         <span>{reply.votes}</span>
//                         <button onClick={() => handleVote(thread.id, reply.id, false)}>👎</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="reply-form">
//                 <textarea
//                   value={newReply}
//                   onChange={(e) => setNewReply(e.target.value)}
//                   placeholder="Write your reply..."
//                 />
//                 <button onClick={() => handleNewReply(thread.id)}>Post Reply</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="study-guide-container">
//           <h2>Learning Resources</h2>
//           <div className="study-guide-section">
//             <h3>DSA Resources</h3>
//             <ul>
//               {studyGuideResources.DSA.map((resource, index) => (
//                 <li key={index}>
//                   <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                     {resource.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="study-guide-section">
//             <h3>Pandas Resources</h3>
//             <ul>
//               {studyGuideResources.Pandas.map((resource, index) => (
//                 <li key={index}>
//                   <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                     {resource.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import './Discussion.css';
// import './LearningResources.css';
// import CommunityDiscussions from './CommunityDiscussions';
// import LearningResources from './LearningResources';

// function App() {
//   const [activeTab, setActiveTab] = useState('forum'); // Track the active tab

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Discussion Forum</h1>
//       </header>

//       <div className="tabs">
//         <button
//           className={activeTab === 'forum' ? 'active large-button' : 'large-button'}
//           onClick={() => setActiveTab('forum')}
//         >
//           Community Discussions
//         </button>
//         <button
//           className={activeTab === 'study-guide' ? 'active large-button' : 'large-button'}
//           onClick={() => setActiveTab('study-guide')}
//         >
//           Learning Resources
//         </button>
//       </div>

//       {/* Conditionally render the active tab's component */}
//       {activeTab === 'forum' ? (
//         <CommunityDiscussions />
//       ) : (
//         <LearningResources />
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './Discussion.css';
// import './LearningResources.css';
// import CommunityDiscussions from './CommunityDiscussions';
// import LearningResources from './LearningResources';
// import Career from './Career';
// import SupportFeedback from './SupportFeedback';

// function App() {
//   const [activeTab, setActiveTab] = useState('forum'); // Track the active tab

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Discussion Forum</h1>
//       </header>

//       <div className="tabs">
//         <button
//           className={activeTab === 'forum' ? 'active large-button' : 'large-button'}
//           onClick={() => setActiveTab('forum')}
//         >
//           Community Discussions
//         </button>
//         <button
//           className={activeTab === 'study-guide' ? 'active large-button' : 'large-button'}
//           onClick={() => setActiveTab('study-guide')}
//         >
//           Learning Resources
//         </button>
//         <button
//           className={activeTab === 'career' ? 'active large-button' : 'large-button'}
//           onClick={() => setActiveTab('career')}
//         >
//           Career
//         </button>
//         <button
//           className={activeTab === 'support' ? 'active large-button' : 'large-button'}
//           onClick={() => setActiveTab('support')}
//         >
//           Support & Feedback
//         </button>
//       </div>

//       {/* Conditionally render the active tab's component */}
//       {activeTab === 'forum' && <CommunityDiscussions />}
//       {activeTab === 'study-guide' && <LearningResources />}
//       {activeTab === 'career' && <Career />}
//       {activeTab === 'support' && <SupportFeedback />}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './Discussion.css';
import CommunityDiscussions from './CommunityDiscussions';
import LearningResources from './LearningResources';
import Career from './Career';
import SupportFeedback from './SupportFeedback';

function App() {
  const [activeTab, setActiveTab] = useState('forum');

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Categories</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'forum' ? 'active' : ''} 
              onClick={() => setActiveTab('forum')}
            >
              <span className="nav-icon">💬</span>
              Community Discussions
            </li>
            <li 
              className={activeTab === 'career' ? 'active' : ''} 
              onClick={() => setActiveTab('career')}
            >
              <span className="nav-icon">💼</span>
              Career
            </li>
            <li 
              className={activeTab === 'study-guide' ? 'active' : ''} 
              onClick={() => setActiveTab('study-guide')}
            >
              <span className="nav-icon">📚</span>
              Learning Resources
            </li>
            <li 
              className={activeTab === 'support' ? 'active' : ''} 
              onClick={() => setActiveTab('support')}
            >
              <span className="nav-icon">🤝</span>
              Support & Feedback
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="main-header">
          <h1>Discussion Forum</h1>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'forum' && <CommunityDiscussions />}
          {activeTab === 'study-guide' && <LearningResources />}
          {activeTab === 'career' && <Career />}
          {activeTab === 'support' && <SupportFeedback />}
        </div>
      </div>
    </div>
  );
}

export default App;