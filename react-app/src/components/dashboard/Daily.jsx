import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Hash, ExternalLink } from 'lucide-react';

const DailyQuestion = (userData) => {
  const [isVisible, setIsVisible] = useState(false);
  const data = useMemo(() => userData.userData, [userData]);
  
  const daily = {
    date: data?.daily?.date || new Date().toISOString().split('T')[0],
    link: data?.daily?.link || "https://leetcode.com/problemset/",
    questionTitle: data?.daily?.questionTitle?.length > 30 ? 
      data.daily.questionTitle.slice(0, 30) + '...' : data.daily.questionTitle || "Daily Challenge",
    questionId: data?.daily?.questionId || "0001",
    difficulty: data?.daily?.difficulty || "You",
    topicTags: data?.daily?.topicTags || ["Are", "Awesome"]
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-gradient-to-r from-green-400 to-green-500';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 'hard':
        return 'bg-gradient-to-r from-red-400 to-red-500';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  return (
        <div className="bg-white w-full shadow-lg rounded-xl mx-auto p-8 
                        transition-all duration-300 ease-in-out hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 pl-1">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600 font-medium">{daily.date}</span>
            </div>
            <div className={`px-4 py-2 rounded-full text-white font-medium shadow-sm ${getDifficultyStyle(daily.difficulty)}`}>
              {daily.difficulty}
            </div>
            <a 
              href={daily.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full
                hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5 group"
            >
              <span className="font-medium">Solve Challenge</span>
              <ExternalLink className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="pb-1">
            <div className="flex items-center space-x-3 pb-6">
              <div className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full font-mono text-sm">
                #{daily.questionId}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 
                            bg-clip-text text-transparent">
                {daily.questionTitle}
              </h2>
            </div>
            
          </div>

          <div className="flex flex-wrap gap-2">
            {daily.topicTags.slice(0, 3).map((tag, index) => (
              <div
                key={tag}
                className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100
                  text-gray-700 text-sm font-medium border border-gray-200 hover:border-gray-300 transition-all
                  transform duration-500 ease-out cursor-pointer hover:shadow-md
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Hash className="w-3 h-3 mr-2 text-blue-500" />
                {tag}
              </div>
            ))}
          </div>
        </div>
  );
};

export default DailyQuestion;