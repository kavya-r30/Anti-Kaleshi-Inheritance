// import React, { useState, useRef } from 'react';
// import { Send, Sparkles } from 'lucide-react';

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   // const messagesEndRef = useRef(null);
//   const [error, setError] = useState(null);

//   const LoadingMessage = () => (
//     <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm">
//       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
//       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
//       <span className="text-gray-500 ml-2">Generating response...</span>
//     </div>
//   );

//   const fetchResponse = async (userMessage) => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       // API delay
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       // Actual API call
//       return "Chatbot Response...";
//     } catch (error) {
//       setError("Failed to generate response. Please try again.");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSend = async (message) => {
//     if (!message.trim()) return;
    
//     setMessages(prev => [...prev, { text: message, sender: 'user' }]);
//     setShowWelcome(false);
//     setInput('');

//     const response = await fetchResponse(message);
//     if (response) {
//       setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
//     }
//   };

//   const quickActions = [
//     'Generate leetcode user summary',
//     'Write my coding resume',
//     'Where should I improve to ehanance my skills'
//   ];

//   return (
//     <div className="flex flex-col pb-10 min-h-[calc(100vh-3.5rem)] bg-purple-50">
//       <div className={`flex-1 flex flex-col ${showWelcome ? 'justify-center' : 'justify-end'} px-4 pb-4`}>
//         <div className="w-full max-w-3xl mx-auto">
//           {showWelcome && (
//             <div className="text-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-700">
//                 Ready to <code className="bg-blue-50 px-2 py-1 rounded bg-gradient-to-t from-blue-200 to-blue-100">commit</code> ? Let's rock this!
//               </h2>
//             </div>
//           )}

//           <div className="space-y-4">
//             {showWelcome ? (
//               <>
//                 <div className="p-6 border border-gray-200 bg-white rounded-xl shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <div className="text px-2 ">iCode AI</div>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-600 px-2">
//                       <Sparkles size={20} />
//                     </button>
//                   </div>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="How can I help with your coding profile today?"
//                       className="flex-1 p-3 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
//                     />
//                     <button
//                       onClick={() => handleSend(input)}
//                       disabled={isLoading || !input.trim()}
//                       className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="rounded-lg">
//                   <div className="flex flex-wrap items-center gap-2">
//                     {quickActions.map((action, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleSend(action)}
//                         className="px-4 py-2 bg-white hover:bg-purple-100 rounded-2xl border border-blue-100 text-sm text-gray-700 transition-colors"
//                       >
//                         {action}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="space-y-4">
//                   {messages.map((message, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`p-3 rounded-lg max-w-[80%] ${
//                           message.sender === 'user'
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-white text-gray-800'
//                         }`}
//                       >
//                         {message.text}
//                       </div>
//                     </div>
//                   ))}
//                   {isLoading && <LoadingMessage />}
//                   {error && (
//                     <div className="p-3 bg-red-50 text-red-600 rounded-lg">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-2 bg-white border border-gray-200 rounded-xl shadow">
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="Message CodeProfile AI..."
//                       className="flex-1 p-2 bg-purple-50 rounded-lg focus:outline-none"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
//                     />
//                     <button
//                       onClick={() => handleSend(input)}
//                       disabled={isLoading || !input.trim()}
//                       className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;

// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Sparkles } from 'lucide-react';
// import axios from 'axios';

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Fetch user data from the provided API
//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(
//         'https://user-api-kavya.onrender.com/api/user?lc=kevinz56&cf=&cc=&gfg=&atc='
//       );
//       console.log('API Response:', response.data); // Log the API response
//       return response.data;
//     } catch (error) {
//       setError('Failed to fetch user data. Please try again.');
//       return null;
//     }
//   };

//   // Generate a response using the Gemini API
//   const fetchResponse = async (userMessage) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Fetch user data
//       const userData = await fetchUserData();
//       if (!userData) {
//         return 'Failed to fetch user data. Please try again.';
//       }

//       // Check if the required data is available
//       if (!userData.leetcode || !userData.leetcode.profile) {
//         return 'The required LeetCode data is not available in the API response.';
//       }

//       // Replace with your Gemini API key
//       const GEMINI_API_KEY = 'AIzaSyAh_1hnJT8YOTLmd1YhOpf1yVvbU6ZWGQg';
//       const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

//       // Prepare the prompt for the Gemini API
//       const prompt = `User data: ${JSON.stringify(
//         userData.leetcode.profile
//       )}\n\nUser question: ${userMessage}`;

//       // Send the prompt to the Gemini API
//       const response = await axios.post(
//         GEMINI_API_URL,
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: prompt,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Extract the response text from the API
//       const botResponse = response.data.candidates[0].content.parts[0].text;
//       return botResponse;
//     } catch (error) {
//       setError('Failed to generate response. Please try again.');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle sending a message
//   const handleSend = async (message) => {
//     if (!message.trim()) return;

//     setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
//     setShowWelcome(false);
//     setInput('');

//     const response = await fetchResponse(message);
//     if (response) {
//       setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
//     }
//   };

//   // Quick actions for common queries
//   const quickActions = [
//     'What is my LeetCode rank?',
//     'How many problems have I solved on LeetCode?',
//     'What are my LeetCode contribution points?',
//   ];

//   return (
//     <div className="flex flex-col pb-10 min-h-[calc(100vh-3.5rem)] bg-purple-50">
//       <div
//         className={`flex-1 flex flex-col ${
//           showWelcome ? 'justify-center' : 'justify-end'
//         } px-4 pb-4 overflow-y-auto`}
//       >
//         <div className="w-full max-w-3xl mx-auto">
//           {showWelcome && (
//             <div className="text-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-700">
//                 Ready to{' '}
//                 <code className="bg-blue-50 px-2 py-1 rounded bg-gradient-to-t from-blue-200 to-blue-100">
//                   commit
//                 </code>
//                 ? Let's rock this!
//               </h2>
//             </div>
//           )}

//           <div className="space-y-4">
//             {showWelcome ? (
//               <>
//                 <div className="p-6 border border-gray-200 bg-white rounded-xl shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <div className="text px-2 ">iCode AI</div>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-600 px-2">
//                       <Sparkles size={20} />
//                     </button>
//                   </div>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="How can I help with your coding profile today?"
//                       className="flex-1 p-3 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
//                     />
//                     <button
//                       onClick={() => handleSend(input)}
//                       disabled={isLoading || !input.trim()}
//                       className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="rounded-lg">
//                   <div className="flex flex-wrap items-center gap-2">
//                     {quickActions.map((action, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleSend(action)}
//                         className="px-4 py-2 bg-white hover:bg-purple-100 rounded-2xl border border-blue-100 text-sm text-gray-700 transition-colors"
//                       >
//                         {action}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="space-y-4">
//                   {messages.map((message, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${
//                         message.sender === 'user' ? 'justify-end' : 'justify-start'
//                       }`}
//                     >
//                       <div
//                         className={`p-3 rounded-lg max-w-[80%] ${
//                           message.sender === 'user'
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-white text-gray-800'
//                         }`}
//                       >
//                         {message.text}
//                       </div>
//                     </div>
//                   ))}
//                   {isLoading && (
//                     <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm">
//                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
//                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
//                       <span className="text-gray-500 ml-2">Generating response...</span>
//                     </div>
//                   )}
//                   {error && (
//                     <div className="p-3 bg-red-50 text-red-600 rounded-lg">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-2 bg-white border border-gray-200 rounded-xl shadow">
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="Message CodeProfile AI..."
//                       className="flex-1 p-2 bg-purple-50 rounded-lg focus:outline-none"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
//                     />
//                     <button
//                       onClick={() => handleSend(input)}
//                       disabled={isLoading || !input.trim()}
//                       className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         <div ref={messagesEndRef} />
//       </div>
//     </div>
//   );
// };

// export default ChatBot;

// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Sparkles } from 'lucide-react';
// import axios from 'axios';

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Fetch user data from the provided API
//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(
//         'https://user-api-kavya.onrender.com/api/user?lc=kevinz56&cf=kevinz56&cc=kevin_56&gfg=kevinshfpn1&atc='
//       );
//       console.log('API Response:', response.data); // Log the API response
//       return response.data;
//     } catch (error) {
//       setError('Failed to fetch user data. Please try again.');
//       return null;
//     }
//   };

//   // Generate a response based on the user's query and API data
//   const fetchResponse = async (userMessage) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Fetch user data
//       const userData = await fetchUserData();
//       if (!userData) {
//         return 'Failed to fetch user data. Please try again.';
//       }

//       // Extract relevant fields from the API response
//       const leetcodeData = userData.leetcode?.profile;
//       const codechefData = userData.codechef?.profile;
//       const gfgData = userData.gfg?.profile;

//       // Handle specific user queries
//       if (userMessage.toLowerCase().includes('leetcode rank')) {
//         if (!leetcodeData || !leetcodeData.ranking) {
//           return 'LeetCode rank data is not available.';
//         }
//         return `Your current LeetCode rank is **${leetcodeData.ranking.toLocaleString()}**. Keep up the great work! 🚀`;
//       } else if (userMessage.toLowerCase().includes('leetcode solved')) {
//         if (!leetcodeData || !leetcodeData.totalSolved) {
//           return 'LeetCode solved problems data is not available.';
//         }
//         return `You've solved a total of **${leetcodeData.totalSolved} problems** on LeetCode. That's impressive! 💪`;
//       } else if (userMessage.toLowerCase().includes('leetcode contributions')) {
//         if (!leetcodeData || !leetcodeData.contributionPoints) {
//           return 'LeetCode contribution points data is not available.';
//         }
//         return `You've earned **${leetcodeData.contributionPoints.toLocaleString()} contribution points** on LeetCode. Great job contributing to the community! 🌟`;
//       } else if (userMessage.toLowerCase().includes('codechef rank')) {
//         if (!codechefData || !codechefData.ranking) {
//           return 'CodeChef rank data is not available.';
//         }
//         return `Your current CodeChef rank is **${codechefData.ranking.toLocaleString()}**. Keep pushing! 🚀`;
//       } else if (userMessage.toLowerCase().includes('codechef solved')) {
//         if (!codechefData || !codechefData.totalSolved) {
//           return 'CodeChef solved problems data is not available.';
//         }
//         return `You've solved a total of **${codechefData.totalSolved} problems** on CodeChef. Well done! 💪`;
//       } else if (userMessage.toLowerCase().includes('gfg rank')) {
//         if (!gfgData || !gfgData.ranking) {
//           return 'GeeksforGeeks rank data is not available.';
//         }
//         return `Your current GeeksforGeeks rank is **${gfgData.ranking.toLocaleString()}**. Keep learning! 🚀`;
//       } else if (userMessage.toLowerCase().includes('gfg solved')) {
//         if (!gfgData || !gfgData.totalSolved) {
//           return 'GeeksforGeeks solved problems data is not available.';
//         }
//         return `You've solved a total of **${gfgData.totalSolved} problems** on GeeksforGeeks. Great job! 💪`;
//       } else {
//         // Use Gemini API for generic responses
//         const GEMINI_API_KEY = 'AIzaSyAh_1hnJT8YOTLmd1YhOpf1yVvbU6ZWGQg';
//         const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

//         const prompt = `User data: ${JSON.stringify(
//           userData
//         )}\n\nUser question: ${userMessage}`;

//         const response = await axios.post(
//           GEMINI_API_URL,
//           {
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: prompt,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         return response.data.candidates[0].content.parts[0].text;
//       }
//     } catch (error) {
//       setError('Failed to generate response. Please try again.');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle sending a message
//   const handleSend = async (message) => {
//     if (!message.trim()) return;

//     setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
//     setShowWelcome(false);
//     setInput('');

//     const response = await fetchResponse(message);
//     if (response) {
//       setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
//     }
//   };

//   // Quick actions for common queries
//   const quickActions = [
//     'What is my LeetCode rank?',
//     'How many problems have I solved on LeetCode?',
//     'What are my LeetCode contribution points?',
//     'What is my CodeChef rank?',
//     'How many problems have I solved on CodeChef?',
//     'What is my GeeksforGeeks rank?',
//     'How many problems have I solved on GeeksforGeeks?',
//   ];

//   return (
//     <div className="flex flex-col pb-10 min-h-[calc(100vh-3.5rem)] bg-purple-50">
//       <div
//         className={`flex-1 flex flex-col ${
//           showWelcome ? 'justify-center' : 'justify-end'
//         } px-4 pb-4 overflow-y-auto`}
//       >
//         <div className="w-full max-w-3xl mx-auto">
//           {showWelcome && (
//             <div className="text-center mb-4">
//               <h2 className="text-2xl font-semibold text-gray-700">
//                 Ready to{' '}
//                 <code className="bg-blue-50 px-2 py-1 rounded bg-gradient-to-t from-blue-200 to-blue-100">
//                   commit
//                 </code>
//                 ? Let's rock this!
//               </h2>
//             </div>
//           )}

//           <div className="space-y-4">
//             {showWelcome ? (
//               <>
//                 <div className="p-6 border border-gray-200 bg-white rounded-xl shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <div className="text px-2 ">iCode AI</div>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-600 px-2">
//                       <Sparkles size={20} />
//                     </button>
//                   </div>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="How can I help with your coding profile today?"
//                       className="flex-1 p-3 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
//                     />
//                     <button
//                       onClick={() => handleSend(input)}
//                       disabled={isLoading || !input.trim()}
//                       className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="rounded-lg">
//                   <div className="flex flex-wrap items-center gap-2">
//                     {quickActions.map((action, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleSend(action)}
//                         className="px-4 py-2 bg-white hover:bg-purple-100 rounded-2xl border border-blue-100 text-sm text-gray-700 transition-colors"
//                       >
//                         {action}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="space-y-4">
//                   {messages.map((message, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${
//                         message.sender === 'user' ? 'justify-end' : 'justify-start'
//                       }`}
//                     >
//                       <div
//                         className={`p-3 rounded-lg max-w-[80%] ${
//                           message.sender === 'user'
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-white text-gray-800'
//                         }`}
//                       >
//                         {message.text}
//                       </div>
//                     </div>
//                   ))}
//                   {isLoading && (
//                     <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm">
//                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
//                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
//                       <span className="text-gray-500 ml-2">Generating response...</span>
//                     </div>
//                   )}
//                   {error && (
//                     <div className="p-3 bg-red-50 text-red-600 rounded-lg">
//                       {error}
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-2 bg-white border border-gray-200 rounded-xl shadow">
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="Message CodeProfile AI..."
//                       className="flex-1 p-2 bg-purple-50 rounded-lg focus:outline-none"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
//                     />
//                     <button
//                       onClick={() => handleSend(input)}
//                       disabled={isLoading || !input.trim()}
//                       className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         <div ref={messagesEndRef} />
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch user data from the provided API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        'https://user-api-kavya.onrender.com/api/user?lc=kevinz56&cf=kevinz56&cc=kevin_56&gfg=kevinshfpn1&atc='
      );
      console.log('API Response:', response.data); // Log the API response
      return response.data;
    } catch (error) {
      setError('Failed to fetch user data. Please try again.');
      return null;
    }
  };

  // Generate a response based on the user's query and API data
  const fetchResponse = async (userMessage) => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch user data
      const userData = await fetchUserData();
      if (!userData) {
        return 'Failed to fetch user data. Please try again.';
      }

      // Extract relevant fields from the API response
      const leetcodeData = userData.leetcode?.profile;
      const codeforcesData = userData.codeforces?.profile;
      const codechefData = userData.codechef?.profile;
      const gfgData = userData.gfg?.profile;
      const atcoderData = userData.atcoder?.profile;

      // Handle specific user queries
      if (userMessage.toLowerCase().includes('leetcode rank')) {
        if (!leetcodeData || !leetcodeData.ranking) {
          return 'LeetCode rank data is not available.';
        }
        return `Your current LeetCode rank is **${leetcodeData.ranking.toLocaleString()}**. Keep up the great work! 🚀`;
      } else if (userMessage.toLowerCase().includes('leetcode solved')) {
        if (!leetcodeData || !leetcodeData.totalSolved) {
          return 'LeetCode solved problems data is not available.';
        }
        return `You've solved a total of **${leetcodeData.totalSolved} problems** on LeetCode. That's impressive! 💪`;
      } else if (userMessage.toLowerCase().includes('leetcode contributions')) {
        if (!leetcodeData || !leetcodeData.contributionPoints) {
          return 'LeetCode contribution points data is not available.';
        }
        return `You've earned **${leetcodeData.contributionPoints.toLocaleString()} contribution points** on LeetCode. Great job contributing to the community! 🌟`;
      } else if (userMessage.toLowerCase().includes('codeforces rank')) {
        if (!codeforcesData || !codeforcesData.ranking) {
          return 'Codeforces rank data is not available.';
        }
        return `Your current Codeforces rank is **${codeforcesData.ranking.toLocaleString()}**. Keep pushing! 🚀`;
      } else if (userMessage.toLowerCase().includes('codeforces solved')) {
        if (!codeforcesData || !codeforcesData.totalSolved) {
          return 'Codeforces solved problems data is not available.';
        }
        return `You've solved a total of **${codeforcesData.totalSolved} problems** on Codeforces. Well done! 💪`;
      } else if (userMessage.toLowerCase().includes('codechef rank')) {
        if (!codechefData || !codechefData.ranking) {
          return 'CodeChef rank data is not available.';
        }
        return `Your current CodeChef rank is **${codechefData.ranking.toLocaleString()}**. Keep pushing! 🚀`;
      } else if (userMessage.toLowerCase().includes('codechef solved')) {
        if (!codechefData || !codechefData.totalSolved) {
          return 'CodeChef solved problems data is not available.';
        }
        return `You've solved a total of **${codechefData.totalSolved} problems** on CodeChef. Well done! 💪`;
      } else if (userMessage.toLowerCase().includes('gfg rank')) {
        if (!gfgData || !gfgData.ranking) {
          return 'GeeksforGeeks rank data is not available.';
        }
        return `Your current GeeksforGeeks rank is **${gfgData.ranking.toLocaleString()}**. Keep learning! 🚀`;
      } else if (userMessage.toLowerCase().includes('gfg solved')) {
        if (!gfgData || !gfgData.totalSolved) {
          return 'GeeksforGeeks solved problems data is not available.';
        }
        return `You've solved a total of **${gfgData.totalSolved} problems** on GeeksforGeeks. Great job! 💪`;
      } else if (userMessage.toLowerCase().includes('atcoder rank')) {
        if (!atcoderData || !atcoderData.ranking) {
          return 'AtCoder rank data is not available.';
        }
        return `Your current AtCoder rank is **${atcoderData.ranking.toLocaleString()}**. Keep pushing! 🚀`;
      } else if (userMessage.toLowerCase().includes('atcoder solved')) {
        if (!atcoderData || !atcoderData.totalSolved) {
          return 'AtCoder solved problems data is not available.';
        }
        return `You've solved a total of **${atcoderData.totalSolved} problems** on AtCoder. Well done! 💪`;
      } else {
        // Use Gemini API for generic responses
        const GEMINI_API_KEY = 'AIzaSyAh_1hnJT8YOTLmd1YhOpf1yVvbU6ZWGQg';
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

        const prompt = `User data: ${JSON.stringify(
          userData
        )}\n\nUser question: ${userMessage}`;

        const response = await axios.post(
          GEMINI_API_URL,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        return response.data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      setError('Failed to generate response. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending a message
  const handleSend = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setShowWelcome(false);
    setInput('');

    const response = await fetchResponse(message);
    if (response) {
      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
    }
  };

  // Quick actions for common queries
  const quickActions = [
    'What is my LeetCode rank?',
    'How many problems have I solved on LeetCode?',
    // 'What are my LeetCode contribution points?',
    'What is my Codeforces rank?',
    'How many problems have I solved on Codeforces?',
    'What is my CodeChef rank?',
    // 'How many problems have I solved on CodeChef?',
    'What is my GeeksforGeeks rank?',
    'How many problems have I solved on GeeksforGeeks?',
    // 'What is my AtCoder rank?',
    // 'How many problems have I solved on AtCoder?',
  ];

  return (
    <div className="flex flex-col pb-10 min-h-[calc(100vh-3.5rem)] bg-purple-50">
      <div
        className={`flex-1 flex flex-col ${
          showWelcome ? 'justify-center' : 'justify-end'
        } px-4 pb-4 overflow-y-auto`}
      >
        <div className="w-full max-w-3xl mx-auto">
          {showWelcome && (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Ready to{' '}
                <code className="bg-blue-50 px-2 py-1 rounded bg-gradient-to-t from-blue-200 to-blue-100">
                  commit
                </code>
                ? Let's rock this!
              </h2>
            </div>
          )}

          <div className="space-y-4">
            {showWelcome ? (
              <>
                <div className="p-6 border border-gray-200 bg-white rounded-xl shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text px-2 ">iCode AI</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 px-2">
                      <Sparkles size={20} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="How can I help with your coding profile today?"
                      className="flex-1 p-3 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
                      onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                    />
                    <button
                      onClick={() => handleSend(input)}
                      disabled={isLoading || !input.trim()}
                      className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>

                <div className="rounded-lg">
                  <div className="flex flex-wrap items-center gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(action)}
                        className="px-4 py-2 bg-white hover:bg-purple-100 rounded-2xl border border-blue-100 text-sm text-gray-700 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-[80%] ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
                      <span className="text-gray-500 ml-2">Generating response...</span>
                    </div>
                  )}
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>
                <div className="p-2 bg-white border border-gray-200 rounded-xl shadow">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Message CodeProfile AI..."
                      className="flex-1 p-2 bg-purple-50 rounded-lg focus:outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                    />
                    <button
                      onClick={() => handleSend(input)}
                      disabled={isLoading || !input.trim()}
                      className="p-2 text-blue-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBot;