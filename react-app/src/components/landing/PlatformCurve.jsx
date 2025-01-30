import React from 'react';
import githubP from '../../assets/github.svg'
import leetcodeP from '../../assets/leetcode.svg'
import cfP from '../../assets/code-forces.svg'
import ccP from '../../assets/codechef.svg'
import gfgP from '../../assets/geeksforgeeks.svg'
import atcP from '../../assets/atcoder.svg'

const PlatformCurve = () => {
  const platforms = [
    { name: 'GitHub', icon: githubP },
    { name: 'Leetcode', icon: leetcodeP },
    { name: 'Codeforces', icon: cfP },
    { name: 'Codechef', icon: ccP },
    { name: 'GeeksforGeeks', icon: gfgP },
    { name: 'atCoder', icon: atcP }
  ];

  return (
    <div className="relative h-56 mx-auto max-w-6xl overflow-hidden mt-8">
      <div className="absolute inset-x-8 h-full flex justify-between items-center">
        {platforms.map((platform, index) => (
          <div key={index} className="relative group" style={{transform: 
            `translateY(${Math.sin((index / 3) * Math.PI) * 32}px) rotate(${Math.sin((index / 3) * Math.PI) * 10}deg)`}}
          >
            <div 
              className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-lg 
                text-2xl transform group-hover:scale-110 group-hover:rotate-0 transition-all duration-300
                hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-gray-100"
            >
                <img src={platform.icon} alt={platform} className='w-10 h-10'/>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                {platform.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformCurve;