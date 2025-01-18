import React from 'react';
import { Search } from 'lucide-react';
import { platforms, platformColors } from '../../config/platformConfig'

const Filters = ({ searchTerm, setSearchTerm, selectedPlatforms, togglePlatform }) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search contests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-3xl shadow shadow-[#C9B5D1] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Platform Filters */}
      <div className="flex flex-wrap gap-2">
        {platforms.map(platform => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`px-3 py-1.5 rounded-3xl text-xs font-medium transition-colors ${
              selectedPlatforms[platform.id]
                ? `${platformColors(platform.id).bg} text-white`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;