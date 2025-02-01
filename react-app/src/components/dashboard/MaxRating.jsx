import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, TrendingUp, Star } from 'lucide-react';
import leetcode from '../../assets/leetcode.svg';
import codeforces from '../../assets/code-forces.svg';
import codechef from '../../assets/codechef.svg';

const MaxRating = (userData) => {
  const [isVisible, setIsVisible] = useState(false);
  const data = useMemo(() => userData.userData || {}, [userData]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const platforms = [
    {
      name: "LeetCode",
      currentRating: parseInt(data?.leetcode?.contests?.stats?.rating) || 0,
      maxRating: parseInt(data?.leetcode?.contests?.stats?.rating) || 0,
      color: "#FFA116",
      ranking: data?.leetcode?.contests?.stats?.globalRanking 
        ? data.leetcode.contests.stats.globalRanking.toLocaleString() 
        : "-",
      status: data?.leetcode?.contests?.stats?.topPercentage 
        ? `Top ${data.leetcode.contests.stats.topPercentage}%` 
        : "-",
      icon: leetcode,
    },
    {
      name: "CodeChef",
      currentRating: parseInt(data?.codechef?.profile?.rating) || 0,
      maxRating: parseInt(data?.codechef?.profile?.highestRating) || 0,
      color: "#5B4638",
      ranking: data?.codechef?.profile?.globalRank 
        ? data.codechef.profile.globalRank.toLocaleString() 
        : "-",
      status: data?.codechef?.profile?.stars || "-",
      icon: codechef,
    },
    {
      name: "Codeforces",
      currentRating: data?.codeforces?.profile?.rating || 0,
      maxRating: data?.codeforces?.profile?.maxRating || 0,
      color: "#1F8ACB",
      ranking: "-",
      status: data?.codeforces?.profile?.rank 
        ? data.codeforces.profile.rank.charAt(0).toUpperCase() + 
          data.codeforces.profile.rank.slice(1) 
        : "-",
      icon: codeforces,
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out 
          hover:shadow-xl mx-auto p-8 flex flex-col justify-around h-full">
      <div className="flex items-center pb-5">
        <Star className="w-12 h-12 text-purple-500 px-2 py-2 border bg-purple-100 rounded-full" />
        <div className="text-3xl text-gray-600 pl-2" style={{ fontFamily: 'noto-bold' }}>
          Ratings
        </div>
      </div>

      <div className="space-y-6">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className={`transform transition-all duration-500 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <PlatformCard platform={platform} />
          </div>
        ))}
      </div>
    </div>
  );
};

const PlatformCard = ({ platform }) => (
  <div>
    <div className="flex items-center justify-between pb-0.5 mb-2">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5">
          {platform.icon && <img src={platform.icon} alt={`${platform.name} icon`} />}
        </div>
        <div className="text-[1.185rem] font-semibold text-gray-700">
          {platform.name}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500">{platform.ranking}</div>
        <div 
          className="text-[0.925rem] px-2 py-1 rounded-full" 
          style={{ 
            backgroundColor: `${platform.color}15`, 
            color: platform.color 
          }}
        >
          {platform.status}
        </div>
      </div>
    </div>

    <div className="group hover:bg-gray-100 transition-all duration-300 pb-1">
      <div className="flex items-center justify-between">
        <RatingSection
          label="Current"
          value={platform.currentRating}
          icon={TrendingUp}
          color={platform.color}
        />

        <RatingSection
          label="Max"
          value={platform.maxRating}
          icon={Trophy}
          color={platform.color}
          reverse
        />
      </div>
    </div>
  </div>
);

const RatingSection = ({ label, value, icon: Icon, color, reverse }) => (
  <div className={`flex items-center ${reverse ? 'text-right' : ''}`}>
    {!reverse && (
      <div className="flex items-center space-x-2 pr-3">
        <Icon className="w-4 h-4 text-gray-400" />
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    )}

    <div className="text-3xl" style={{ fontFamily: 'fairway-medium', color }}>
      {value}
    </div>

    {reverse && (
      <div className="flex items-center space-x-2 pl-3">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    )}
  </div>
);

export default MaxRating;