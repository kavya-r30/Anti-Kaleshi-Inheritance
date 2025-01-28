import React from 'react';
import { data } from '../data';
import default_badge from '../../assets/code.png';

const BadgesDisplay = () => {
  const badges =  data?.leetcode?.badges;

  const visible_badges = 4;

  if (!badges || !badges.list || badges.list.length === 0) {
    return (
      <div className="bg-white w-full h-[16.5rem] shadow-lg rounded-xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="text-3xl text-gray-600" style={{ fontFamily: 'noto-bold' }}>Badges</div>
        </div>
          <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={default_badge}
            alt="No badges"
            className="w-20 h-20 rounded-lg object-cover"
          />
          <span className="text-gray-500 font-semibold">No badges earned yet</span>
          </div>
        </div>
    );
  }

  return (
    <div className="bg-white w-full h-[16.5rem] shadow-lg rounded-xl mx-auto p-8 
                    transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="text-3xl text-gray-600" style={{ fontFamily: 'noto-bold' }}>Badges</div>
        <div className="text-lg text-blue-400" style={{ fontFamily: 'notoc-sbold' }}>
          {badges.total} earned
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-6">
        {badges.list.slice(0, visible_badges).map((badge) => (
          <div key={badge.id} className="relative group">
            <div className="relative bg-gray-50 w-28 h-28 rounded-xl overflow-hidden 
                          transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
                          border-2 border-gray-100 hover:border-blue-200">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={badge.icon}
                  alt={badge.displayName}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="absolute top-0 right-0 bg-gray-900/80 backdrop-blur-sm 
                            text-white text-xs px-2 py-0.5 rounded-bl-lg rounded-tr-lg
                            font-medium">
                {new Date(badge.creationDate).toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
            
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible
                          transition-all duration-200 z-10 w-max">
              <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg
                            font-medium whitespace-nowrap">
                {badge.displayName}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                              border-solid border-4 border-transparent border-b-gray-900">
                </div>
              </div>
            </div>
          </div>
        ))}

        {badges.list.length > visible_badges && (
          <div className="relative w-4 h-4 items-center justify-center pt-12">
            +{badges.list.length - visible_badges}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgesDisplay;