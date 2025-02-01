import React, { useMemo, useRef, useEffect, useState } from 'react';

const Heatmap = (githubData) => {
  const data = useMemo(() => githubData.githubData, [githubData]);
  const heatmapData = data.heatmap;
  
  const pastSubsRef = useRef(0);
  const [pastSubs, setPastSubs] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const convertTimestamp = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num));
    return Math.floor(Date.UTC(year, month - 1, day, 0, 0, 0) / 1000);
  };

  const monthSize = 11; // 12 months to display

  const generateMonthData = () => {
    const months = [];
    const today = new Date(); 
    const todayStr = today.toISOString().split('T')[0];

    for (let i = monthSize; i >= 0; i--) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const weeks = [];
      let currentWeek = Array(7).fill(null);

      for (let d = 0; d < firstDay.getDay(); d++) {
        currentWeek[d] = null;
      }

      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayOfWeek = new Date(year, month, day).getDay();

        if (date > todayStr) break;

        const timestamp = convertTimestamp(date);
        const dayData = heatmapData[timestamp] || 0;
        pastSubsRef.current += dayData; 

        if (currentWeek[dayOfWeek] === null) {
          currentWeek[dayOfWeek] = { date, count: dayData, timestamp };
        }

        if (dayOfWeek === 6) {
          weeks.push(currentWeek);
          currentWeek = Array(7).fill(null);
        }
      }

      if (currentWeek.some(day => day !== null)) {
        weeks.push(currentWeek);
      }

      months.push({
        name: monthDate.toLocaleString('default', { month: 'short' }),
        weeks
      });
    }

    return months;
  };

  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-blue-50';
    if (count <= 3) return 'bg-purple-100';
    if (count <= 6) return 'bg-purple-300';
    if (count <= 10) return 'bg-purple-500';
    return 'bg-purple-700';
  };

  const months = useMemo(generateMonthData, [heatmapData]);

  useEffect(() => {
    setPastSubs(pastSubsRef.current);
  }, [months]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out   hover:shadow-xl">
      <div className="flex gap-2 justify-center items-center">
        {months.map((month, index) => (
          <div key={month.name} className={`flex flex-col transition-all ease-out transformx duration-500 
              ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}style={{ transitionDelay: `${index * 25}ms` }}>
            <div className="text-sm font-medium text-gray-800 mb-2 text-center">
              {month.name}
            </div>
            <div className="flex">
              <div className="flex flex-col gap-[1px]">
                {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                  <div key={dayIndex} className="flex gap-[1px]">
                    {month.weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className={`w-3 h-3 ${week[dayIndex] ? getIntensityColor(week[dayIndex].count) : 'bg-transparent'} 
                            rounded-sm hover:ring-1 hover:ring-purple-400 transition-all duration-200
                          ${week[dayIndex] && week[dayIndex].count > 0 ? 'shadow-sm' : ''}`}
                        title={week[dayIndex] ? `${week[dayIndex].date}: ${week[dayIndex].count} contributions` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center gap-2 pl-2 pr-2 mt-4">
        <div className="">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">
              {pastSubs} contributions in past {monthSize + 1} months
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-slate-100 rounded-[2px]"></div>
            <div className="w-3 h-3 bg-purple-100 rounded-[2px] shadow-sm"></div>
            <div className="w-3 h-3 bg-purple-300 rounded-[2px] shadow-sm"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-[2px] shadow-sm"></div>
            <div className="w-3 h-3 bg-purple-700 rounded-[2px] shadow-sm"></div>
          </div>
          <span className="text-xs text-slate-400">More</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
