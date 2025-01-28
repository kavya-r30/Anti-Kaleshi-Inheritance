import React, { useState, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const messagesEndRef = useRef(null);
  const [error, setError] = useState(null);

  const LoadingMessage = () => (
    <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
      <span className="text-gray-500 ml-2">Generating response...</span>
    </div>
  );

  const fetchResponse = async (userMessage) => {
    try {
      setIsLoading(true);
      setError(null);
      // API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Actual API call
      return "Chatbot Response...";
    } catch (error) {
      setError("Failed to generate response. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (message) => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setShowWelcome(false);
    setInput('');

    const response = await fetchResponse(message);
    if (response) {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }
  };

  const quickActions = [
    'Generate leetcode user summary',
    'Write my coding resume',
    'Where should I improve to ehanance my skills'
  ];

  return (
    <div className="flex flex-col pb-10 min-h-[calc(100vh-3.5rem)] bg-purple-50">
      <div className={`flex-1 flex flex-col ${showWelcome ? 'justify-center' : 'justify-end'} px-4 pb-4`}>
        <div className="w-full max-w-3xl mx-auto">
          {showWelcome && (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Ready to <code className="bg-blue-50 px-2 py-1 rounded bg-gradient-to-t from-blue-200 to-blue-100">commit</code> ? Let's rock this!
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
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
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
                  {isLoading && <LoadingMessage />}
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
      </div>
    </div>
  );
};

export default ChatBot;