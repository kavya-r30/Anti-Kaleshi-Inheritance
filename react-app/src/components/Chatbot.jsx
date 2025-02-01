import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import { useProfileData } from '../hooks/useChatbot'

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { data, loading, refresh } = useProfileData();
  // console.log(data);

  const LoadingSpinner = () => (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-purple-50 to-slate-50 flex w-full h-screen items-center justify-center p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  const fetchResponse = async (userMessage) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = data;
      if (!userData) return 'Failed to fetch user data. Please try again.';
      console.log(userData);

      const GEMINI_API_KEY = 'AIzaSyAh_1hnJT8YOTLmd1YhOpf1yVvbU6ZWGQg';
      const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

      const prompt = `
        User Data:
        ${JSON.stringify(userData, null, 2)}

        User Question: "${userMessage}"

        Instructions:
        - Answer strictly based on the provided user data.
        - Be concise yet informative.
        - Do not use bold formatting.
        - If the user asks for rankings or stats, provide direct values.
        - If the user asks about GitHub, summarize contributions and top repositories.
        - If the user requests a descriptive summary, provide an overview of activity across platforms.
        - If specific data is missing, acknowledge it instead of making assumptions.
        - Use emojis and friendly language to make the response engaging.
        - Only If user asks for Code provide the Python or C++ code of that Question with proper Identation 
          along with its description and working`
      ;

      const response = await axios.post(GEMINI_API_URL, { contents: [{ parts: [{ text: prompt }] }] }, 
        { headers: { 'Content-Type': 'application/json' } });
      let responseText = response.data.candidates[0].content.parts[0].text;

      // Replace '**' with empty string and handle new lines properly
      responseText = responseText.replace(/\*\*/g, '').replace(/\\n/g, '\n');

      return responseText;
    } catch (error) {
      setError('Failed to generate response. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

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

  const quickActions = ['What is my LeetCode rank?', 'How many problems have I solved on LeetCode?'];

  return (
    <div className="flex flex-col pb-10 min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-purple-50 to-slate-50">
      <div className={`flex-1 flex flex-col ${showWelcome ? 'justify-center' : 'justify-end'} px-4 pb-4 overflow-y-auto`}>
        <div className="w-full max-w-3xl mx-auto">
          {showWelcome && (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Ready to <code className="bg-blue-50 px-2 py-1 rounded">commit</code>? Let's rock this!
              </h2>
            </div>
          )}
          <div className="space-y-4">
            {showWelcome ? (
              <>
                <div className="p-6 border border-gray-200 bg-white rounded-xl shadow">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about your coding profile..."
                      className="flex-1 p-3 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
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
                <div className="rounded-lg flex flex-wrap gap-2">
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
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-lg max-w-[80%] ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
                        {message.text.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {isLoading && <div className="p-4 bg-white rounded-lg shadow-sm text-gray-500">Generating response...</div>}
                  {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>}
                </div>
                <div className="p-2 bg-white border border-gray-200 rounded-xl shadow">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Message CodeProfile AI..."
                      className="flex-1 p-3 bg-slate-100 rounded-lg focus:outline-none"
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