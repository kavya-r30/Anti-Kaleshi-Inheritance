import React, { useState, useEffect } from 'react';
import { CalendarHeart, Clock, ChevronRight, ChevronLeft, ExternalLink, Search } from 'lucide-react';
import atcoderIcon from '../assets/atCoder.svg'
import codechefIcon from '../assets/codechef.svg';
import codeforcesIcon from '../assets/code-forces.svg';
import gfgIcon from '../assets/GeeksforGeeks.svg';
import leetcodeIcon from '../assets/leetcode.svg';

const ContestCalendar = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    leetcode: true,
    codeforces: true,
    atcoder: true,
    codechef: true,
    geeksforgeeks: true
  });
  
  const platforms = [
    { id: 'leetcode', name: 'LeetCode' },
    { id: 'codeforces', name: 'CodeForces' },
    { id: 'atcoder', name: 'AtCoder' },
    { id: 'codechef', name: 'CodeChef' },
    { id: 'geeksforgeeks', name: 'GeeksForGeeks' }
  ];

  const fetchContests = async (startDate, endDate) => {
    setLoading(true);
    try {
      const encodedStartDate = encodeURIComponent(startDate.toISOString());
      const encodedEndDate = encodeURIComponent(endDate.toISOString());
      const response = await fetch(
        `https://node.codolio.com/api/contest-calendar/v1/all/get-contests?startDate=${encodedStartDate}&endDate=${encodedEndDate}`
      );
      const data = await response.json();
      setContests(data.data || []);
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    fetchContests(startDate, endDate);
  }, [currentDate]);

  const getPlatformConfig = (platform) => {
    const colors = {
      'leetcode': { bg: 'bg-[#e7a41f]', border: 'border-[#e7a41f]', bgo: 'bg-[#fcba35]/60', text: 'text-[#e7a41f]' },
      'codeforces': { bg: 'bg-[#f44336]', border: 'border-[#f44336]', bgo: 'bg-[#f44336]/60', text: 'text-[#f44336]' },
      'atcoder': { bg: 'bg-[#19cfe7]', border: 'border-[#19cfe7]', bgo: 'bg-[#19cfe7]/60', text: 'text-[#19cfe7]' },
      'codechef': { bg: 'bg-[#e47c84]', border: 'border-[#e47c84]', bgo: 'bg-[#d97179]/50', text: 'text-[#e47c84]' },
      'geeksforgeeks': { bg: 'bg-[#308c44]', border: 'border-[#308c44]', bgo: 'bg-[#00bd29]/60', text: 'text-[#308c44]' }
    };
  
    return colors[platform.toLowerCase()] || { bg: 'bg-gray-500', border: 'border-purple-200', bgo: 'bg-purple-200/60' };
  };  

  const platformLogos = {
    'leetcode': leetcodeIcon,
    'codeforces': codeforcesIcon,
    'atcoder': atcoderIcon,
    'codechef': codechefIcon,
    'geeksforgeeks': gfgIcon
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const isUpcoming = (startDate) => {
    return new Date(startDate) > new Date();
    // return new Date(startDate) > new Date(new Date().setDate(new Date().getDate() + 20));
  };

  const filteredContests = contests
    .filter(contest => {
      const matchesSearch = contest.contestName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatforms[contest.platform.toLowerCase()];
      return matchesSearch && matchesPlatform && isUpcoming(contest.contestStartDate);
    })
    .sort((a, b) => new Date(a.contestStartDate) - new Date(b.contestStartDate));

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + increment)));
  };

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  return (
    <div className="min-h-screen bg-purple-50">  
      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-8 py-4">
        {/* Filters Section */}
        <div className="mb-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
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
          <div className="flex flex-wrap gap-2">
            {platforms.map(platform => (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`px-3 py-1.5 rounded-3xl text-xs font-medium transition-colors ${
                  selectedPlatforms[platform.id]
                    ? `${getPlatformConfig(platform.id).bg} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Upcoming Contests */}
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
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredContests.map(contest => (
                      <a
                        href={contest.contestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={contest._id}
                        className="block p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-14 h-14 flex items-center justify-center text-white text-xs font-medium p-2`}>
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
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-gray-200 rounded-xl shadow-md shadow-[#d6b9d0]">
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
                                  className={`border-2 ${getPlatformConfig(contest.platform).border} text-black text-xs p-1 rounded truncate block hover:opacity-90`}
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-screen-xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © 2024 Competitive Programming Calendar. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ContestCalendar;