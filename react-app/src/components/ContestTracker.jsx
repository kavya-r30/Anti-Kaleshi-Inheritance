import React, { useState } from 'react';
import Calendar from './contest-Tracker/Calendar';
import UpcomingContests from './contest-Tracker/UpcomingContests';
import Filters from './contest-Tracker/Filters';
import { useContests } from '../hooks/useContests';

const ContestTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    leetcode: true,
    codeforces: true,
    atcoder: true,
    codechef: true,
    geeksforgeeks: true
  });

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + increment)));
  };

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const { contests, loading, filteredContests } = useContests(
    currentDate,
    searchTerm,
    selectedPlatforms
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-slate-50">
      <main className="max-w-screen-xl mx-auto px-8 py-4">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPlatforms={selectedPlatforms}
          togglePlatform={togglePlatform}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <UpcomingContests
            loading={loading}
            contests={filteredContests}
          />
          
          <Calendar
            currentDate={currentDate}
            changeMonth={changeMonth}
            contests={contests}
            selectedPlatforms={selectedPlatforms}
          />
        </div>
      </main>
    </div>
  );
};

export default ContestTracker;