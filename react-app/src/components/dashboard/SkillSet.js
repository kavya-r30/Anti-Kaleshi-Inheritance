import React, { useState } from 'react';

const Skillset = () => {
  const TOP_N = 6;
  const [activeTab, setActiveTab] = useState('advanced');
  const [isLoading, setIsLoading] = useState(false);
  
  const skills = {
    advanced: [
      { tagName: "Rolling Hash", problemsSolved: 2 },
      { tagName: "Backtracking", problemsSolved: 13 },
      { tagName: "Dynamic Programming", problemsSolved: 31 },
      { tagName: "Divide and Conquer", problemsSolved: 8 },
      { tagName: "Trie", problemsSolved: 8 },
      { tagName: "Union Find", problemsSolved: 1 },
      { tagName: "Binary Indexed Tree", problemsSolved: 1 },
      { tagName: "Segment Tree", problemsSolved: 3 },
      { tagName: "Monotonic Stack", problemsSolved: 9 },
    ],
    intermediate: [
      { tagName: "Tree", problemsSolved: 33 },
      { tagName: "Binary Tree", problemsSolved: 30 },
      { tagName: "Hash Table", problemsSolved: 61 },
      { tagName: "Ordered Set", problemsSolved: 4 },
      { tagName: "Greedy", problemsSolved: 20 },
      { tagName: "Binary Search", problemsSolved: 36 },
      { tagName: "Depth-First Search", problemsSolved: 27 },
      { tagName: "Breadth-First Search", problemsSolved: 17 },
      { tagName: "Recursion", problemsSolved: 8 },
      { tagName: "Sliding Window", problemsSolved: 18 },
      { tagName: "Bit Manipulation", problemsSolved: 18 },
      { tagName: "Math", problemsSolved: 29 },
      { tagName: "Design", problemsSolved: 9 },
      { tagName: "Brainteaser", problemsSolved: 1 },
    ],
    fundamental: [
      { tagName: "Array", problemsSolved: 153 },
      { tagName: "Matrix", problemsSolved: 10 },
      { tagName: "String", problemsSolved: 58 },
      { tagName: "Simulation", problemsSolved: 15 },
      { tagName: "Enumeration", problemsSolved: 4 },
      { tagName: "Sorting", problemsSolved: 30 },
      { tagName: "Stack", problemsSolved: 26 },
      { tagName: "Queue", problemsSolved: 3 },
      { tagName: "Linked List", problemsSolved: 22 },
      { tagName: "Two Pointers", problemsSolved: 38 },
    ],
  };

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 100);
  };

  const getTopSkills = (skillsList) => {
    return [...skillsList]
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, TOP_N);
  };

  const renderSkillList = (skillsList) => {
    const topN = getTopSkills(skillsList);
    const maxProblems = Math.max(...topN.map(skill => skill.problemsSolved));

    return (
      <div className="space-y-4">
        {topN.map((skill) => {
          const percentage = (skill.problemsSolved / maxProblems) * 100;
          
          return (
            <div 
              key={skill.tagName} 
              className="bg-white rounded-lg p-2"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text font-semibold text-gray-600 tracking-wide">
                  {skill.tagName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    {skill.problemsSolved}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    problems
                  </span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-blue-600 to-blue-400"
                  style={{ 
                    width: isLoading ? '0%' : `${percentage}%`,
                    opacity: isLoading ? 0 : 1,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white w-full shadow-lg rounded-xl mx-auto p-8 
                    transition-all duration-300 ease-in-out hover:shadow-xl animate-fadeIn">
      <div className="pb-6">
        <div className="text-3xl text-gray-600" style={{ fontFamily: 'noto-bold' }}>
          Skills Dashboard
        </div>
      </div>

      <div className="w-full">
        <div className="flex space-x-2 mb-5 bg-purple-100 p-1.5 rounded-xl">
          {['advanced', 'intermediate', 'fundamental'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out
                ${activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm transform scale-100' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-500'
                } uppercase tracking-wide`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="mt-4 transition-all duration-300 ease-in-out">
          {activeTab === 'advanced' && renderSkillList(skills.advanced)}
          {activeTab === 'intermediate' && renderSkillList(skills.intermediate)}
          {activeTab === 'fundamental' && renderSkillList(skills.fundamental)}
        </div>
      </div>
    </div>
  );
};

export default Skillset;