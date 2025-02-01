import React, { useState, useEffect } from 'react';

const DSAQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]); // State for selected topics
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [showTopics, setShowTopics] = useState(false); // State to toggle visibility of topic names

  const topics = [
    'Array', 'Matrix', 'String', 'Searching & Sorting', 'LinkedList', 'Binary Trees', 'Binary Search Trees',
    'Greedy', 'BackTracking', 'Stacks & Queues', 'Heap', 'Graph', 'Trie', 'Dynamic Programming', 'Bit Manipulation'
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/450DSA.json');
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging
    
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

  const handleTopicChange = (event) => {
    const topic = event.target.value;
    setSelectedTopics(prevTopics => {
      if (prevTopics.includes(topic)) {
        return prevTopics.filter(t => t !== topic); // Unselect if already selected
      } else {
        return [...prevTopics, topic]; // Add the selected topic
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const filteredQuestions = questions.filter(q => {
    // Check if the question matches the selected topics and search query
    const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(q.topic);
    const matchesSearch = q.problem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const toggleTopics = () => {
    setShowTopics(prevState => !prevState); // Toggle visibility of topics
  };

  if (loading) {
    return (
      <div className="bg-purple-50 flex w-full h-screen items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-xl text-purple-600">Loading DSA Questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-purple-50 flex items-center justify-center w-full h-screen">
        <div className="text-purple-600 text-center">
          <p className="text-2xl font-bold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-3xl hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <main className="max-w-screen-xl mx-auto px-4 md:px-24 py-4 pb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">DSA Questions</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search questions..."
            className="border border-purple-300 rounded-xl p-2 w-full md:w-1/3"
          />
        </div>

        {/* Filter by Topics */}
        <div className="mb-6">
          <label 
            onClick={toggleTopics}
            className="cursor-pointer block text-purple-600 font-semibold mb-2"
          >
            Filter by Topics
          </label>

          {/* Display Topics only if the section is toggled */}
          {showTopics && (
            <div className="flex flex-wrap">
              {topics.map((topic, index) => (
                <div key={index} className="mr-4 mb-2">
                  <label className="inline-flex items-center text-purple-900 font-semibold">
                    <input
                      type="checkbox"
                      value={topic}
                      checked={selectedTopics.includes(topic)}
                      onChange={handleTopicChange}
                      className="form-checkbox text-purple-600"
                    />
                    <span className="ml-2">{topic}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((question, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md border border-purple-100 p-5 hover:shadow-xl transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-purple-900 mb-2">{question.topic}</h3>
              <a
                href={question.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 text-sm underline"
              >
                {question.problem}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DSAQuestions;
