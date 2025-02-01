import React from 'react';
import { CalendarHeart, ChevronLeft, ChevronRight } from 'lucide-react';
import { platformColors } from '../../config/platformConfig';
import { formatDate } from '../../utils/dates';

const Calendar = ({ currentDate, changeMonth, contests, selectedPlatforms }) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <div className="lg:col-span-9">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md shadow-[#d6b9d0]">
        {/* Calendar Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <CalendarHeart className="w-4 h-4" />
            Contests
          </h2>
          <div className="flex items-center gap-3">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-md">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm font-medium text-gray-900">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-md">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-3">
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 42 }).map((_, index) => {
              const dayNum = index - getFirstDayOfMonth(currentDate) + 1;
              const isCurrentMonth = dayNum > 0 && dayNum <= getDaysInMonth(currentDate);
              const dayContests = contests.filter(contest => {
                const contestDate = new Date(contest.contestStartDate);
                return contestDate.getDate() === dayNum && 
                       contestDate.getMonth() === currentDate.getMonth() &&
                       contestDate.getFullYear() === currentDate.getFullYear() &&
                       selectedPlatforms[contest.platform.toLowerCase()];
              });

              return (
                <div 
                  key={index}
                  className={`min-h-[100px] p-1 border border-gray-200 rounded ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {isCurrentMonth && (
                    <div className="h-full">
                      <div className="text-xs font-medium text-gray-700 p-1">{dayNum}</div>
                      <div className="space-y-1 px-1">
                        {dayContests.map(contest => (
                          <a
                            href={contest.contestUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={contest._id}
                            className={`border-2 ${platformColors(contest.platform.toLowerCase()).border} text-black text-xs p-1 rounded truncate block hover:opacity-90`}
                            title={`${contest.contestName} - ${formatDate(contest.contestStartDate)}`}
                          >
                            {contest.contestName}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;