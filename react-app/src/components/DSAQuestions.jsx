import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ExternalLink } from 'lucide-react';

const DSAQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTopics, setShowTopics] = useState(false);

  const topics = [
    'Array', 'Matrix', 'String', 'Searching & Sorting', 'LinkedList', 'Binary Trees', 'Binary Search Trees',
    'Greedy', 'BackTracking', 'Stacks & Queues', 'Heap', 'Graph', 'Trie', 'Dynamic Programming', 'Bit Manipulation'
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/450DSA.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        
        if (!data.Sheet1 || !Array.isArray(data.Sheet1)) {
          throw new Error("Invalid JSON structure: Expected an array inside 'Sheet1'.");
        }
        
        const formattedData = data.Sheet1.map(q => ({
          topic: q["Topic:"]?.trim() || "Unknown",
          problem: q["Problem: "]?.trim() || "Untitled",
          url: q["URL"] || "#"
        }));
        
        setQuestions(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setError(`Failed to load DSA questions: ${error.message}`);
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);

  const handleTopicChange = (topic) => {
    setSelectedTopics(prevTopics => 
      prevTopics.includes(topic) 
        ? prevTopics.filter(t => t !== topic)
        : [...prevTopics, topic]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(q.topic);
    const matchesSearch = q.problem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });
  
  if (loading) {
    return (
      <div className="bg-gradient-to-b from-purple-50 to-slate-50 flex w-full h-screen items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-purple-50 to-slate-50 flex items-center justify-center w-full h-screen">
        <div className="text-purple-600 text-center">
          <p className="text-2xl" style={{ fontFamily: 'Noto-bold' }} >Error: {error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-purple-500 text-white 
            rounded-3xl hover:bg-purple-600"  
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-slate-50">
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl text-purple-600  mb-4" style={{ fontFamily: 'Noto-bold' }}>
            DSA Questions
          </h1>
          <p className="text-purple-600">Master Data Structures and Algorithms one question at a time</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3 text-purple-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-100 focus:border-purple-300 
                       focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200"
            />
          </div>

          <div>
            <button
              onClick={() => setShowTopics(!showTopics)}
              className="flex items-center gap-2 text-purple-600 font-semibold mb-4 hover:text-purple-700 
                       transition-colors duration-200"
            >
              {showTopics ? <X size={20} /> : <Filter size={20} />}
              {showTopics ? 'Hide Topics' : 'Filter by Topics'}
            </button>

            {showTopics && (
              <div className="flex flex-wrap gap-2 mb-4">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicChange(topic)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                              ${selectedTopics.includes(topic)
                                ? 'bg-purple-600 text-white shadow-md transform scale-105'
                                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                              }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((question, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 
                       border border-purple-50 hover:border-purple-200 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                  {question.topic}
                </span>
                <ExternalLink className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={16} />
              </div>
              <a
                href={question.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-900 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                {question.problem}
              </a>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-purple-600 text-lg">No questions found matching your criteria 😕</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DSAQuestions;