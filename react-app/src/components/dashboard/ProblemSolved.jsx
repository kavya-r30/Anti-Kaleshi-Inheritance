import React, { useState, useEffect } from 'react';
import { data } from '../data';

const ProgressRing = ({ segments, total, size = 120, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {segments.map((segment, index) => {
          const percentage = (segment.value / total) * 100;
          const dashArray = (percentage * circumference) / 100;
          const dashOffset = circumference * (1 - accumulatedPercentage / 100);
          accumulatedPercentage += percentage;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${dashArray} ${circumference - dashArray}`}
              strokeDashoffset={dashOffset}
              style={{
                transition: 'stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease'
              }}
            />
          );
        })}
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl text-gray-600" style={{ fontFamily: 'fairway-medium' }}>{total}</span>
      </div>
    </div>
  );
};

const StatSection = ({ title, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="grid grid-cols-3 mb-4 px-4">
      <div className='col-span-2 flex flex-col items-left justify-center'>
        <h3 className="text-xl text-gray-700 mb-2 pr-4 pb-2" style={{ fontFamily: 'noto-bold' }}>{title}</h3>
        <div className="flex flex-col gap-2 justify-center">
            {data.map((item, index) => (
              <div key={index} style={{ transitionDelay: `${index * 150}ms` }}
              className={`flex items-center gap-2 border p-1 mr-14 rounded-md transition-all
                          ease-out duration-500 hover:translate-x-1 hover:shadow-sm
                          ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}/>
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
        </div>
      </div>
      <div className='cols-span-1 flex items-center justify-center pr-7'>
        <ProgressRing 
            segments={data} 
            total={total}
            size={140}
            strokeWidth={15}
        />
      </div>
    </div>
  );
};

const ProblemsSolved = () => {
  const fundamentalsData = [
    { label: 'School', value: (data?.geeksforgeeks?.submissions?.school || 0), color: '#facc15' },
    { label: 'Basic', value: (data?.geeksforgeeks?.submissions?.basic || 0), color: '#4ade80' }
  ];

  const dsaData = [
    { label: 'Easy', value: (data?.geeksforgeeks?.submissions?.easy || 0) +
      (data?.leetcode?.profile?.submissions?.find(submission => submission.difficulty === "Easy")?.count || 0),
       color: '#4ade80' },
    { label: 'Medium', value: (data?.geeksforgeeks?.submissions?.medium || 0) + 
      (data?.leetcode?.profile?.submissions?.find(submission => submission.difficulty === "Medium")?.count || 0), 
      color: '#facc15' },
    { label: 'Hard', value: (data?.geeksforgeeks?.submissions?.hard || 0) +
      (data?.leetcode?.profile?.submissions?.find(submission => submission.difficulty === "Hard")?.count || 0), 
      color: '#ef4444' }
  ];

  const cpData = [
    { label: 'Codechef', value: (data?.codechef?.profile?.totalSolved || 0), color: '#4ade80' },
    { label: 'Codeforces', value: (data?.codeforces?.profile?.totalSolved || 0), color: '#facc15' }
  ];

  return (
    <div className="bg-white w-full shadow-lg rounded-xl mx-auto p-8
                    transition-all duration-300 ease-in-out hover:shadow-xl">
      <div>
        <h2 className="text-3xl mb-8 text-gray-600" style={{ fontFamily: 'Noto-bold' }} >Problems Solved</h2>
        <div className="grid gap-8 mb-2">
          <StatSection 
            title="Fundamentals" 
            data={fundamentalsData}
          />
          <StatSection 
            title="DSA" 
            data={dsaData}
          />
          <StatSection 
            title="Competitive Programming" 
            data={cpData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemsSolved;