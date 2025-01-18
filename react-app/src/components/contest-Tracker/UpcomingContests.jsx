import React from 'react';
import { CalendarHeart, Clock, ExternalLink } from 'lucide-react';
import { formatDate, getDuration } from '../../utils/dates';
import { platformLogos } from '../../config/platformConfig';

const ContestCard = ({ contest }) => (
  <a
    href={contest.contestUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-3 hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className="w-14 h-14 flex items-center justify-center text-white text-xs font-medium p-2">
        <img 
          src={platformLogos[contest.platform.toLowerCase()]}
          alt={`${contest.platform} logo`}
          className="w-full h-full object-contain bg-white"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{contest.contestName}</h3>
        <div className="mt-1 text-xs text-gray-500 space-y-0.5">
          <div className="flex items-center gap-1">
            <CalendarHeart className="w-3.5 h-3.5" />
            {formatDate(contest.contestStartDate)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {getDuration(contest.contestDuration)}
          </div>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400" />
    </div>
  </a>
);

const LoadingSpinner = () => (
  <div className="flex justify-center p-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
  </div>
);

const UpcomingContests = ({ loading, contests }) => {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md shadow-[#d6b9d0] h-[800px]">
        <div className="px-4 py-[0.85rem] border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Upcoming Contests
          </h2>
        </div>
        <div className="overflow-auto h-[calc(100%-3.5rem)] pr-2" style={{scrollbarWidth: 'thin'}}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="divide-y divide-gray-100">
              {contests.map(contest => (
                <ContestCard key={contest._id} contest={contest} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingContests;
