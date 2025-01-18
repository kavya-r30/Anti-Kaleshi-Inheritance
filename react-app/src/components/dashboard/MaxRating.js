import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { data } from '../data';

const MaxRating = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const platforms = [
    {
      name: "LeetCode",
      currentRating: parseInt(data?.leetcode?.contests?.stats?.rating) || 0,
      maxRating: parseInt(data?.leetcode?.contests?.stats?.rating) || 0,
      color: "#FFA116",
      ranking: (data?.leetcode?.contests?.stats?.globalRanking).toLocaleString() || "",
      percentile: "Top " + (data?.leetcode?.contests?.stats?.topPercentage).toString() + "%" || "",
    },
    {
      name: "CodeChef",
      currentRating: 1571,
      maxRating: 1571,
      color: "#5B4638",
      ranking: "23,700",
      percentile: "2★",
    },
    {
      name: "Codeforces",
      currentRating: data?.codeforces?.profile?.rating || 0,
      maxRating: data?.codeforces?.profile?.maxRating || 0,
      color: "#1F8ACB",
      ranking: (data?.codeforces?.profile?.rank) || "",
      percentile: "Entry",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-lg mx-auto p-8 flex flex-col justify-center">
      <div className="text-3xl text-gray-600 pb-5" style={{ fontFamily: 'noto-bold' }}>
        Ratings
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
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <div className="text-lg font-semibold text-gray-700">
          {platform.name}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">{platform.ranking}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          {platform.percentile}
        </span>
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl px-4 py-2 group hover:bg-gray-100 transition-all duration-300">
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

    <div className="text-[1.35rem]" style={{ fontFamily: 'fairway-medium', color }}>
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
