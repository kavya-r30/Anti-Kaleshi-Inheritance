import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const platformConfigs = {
  leetcode: {
    data: [
      { contest: "Biweekly 137", rating: 1462, date: "Feb 2024" },
      { contest: "Weekly 412", rating: 1412.046, date: "Feb 2024" },
      { contest: "Biweekly 140", rating: 1452.437, date: "Mar 2024" },
      { contest: "Weekly 418", rating: 1459.351, date: "Mar 2024" },
      { contest: "Biweekly 141", rating: 1435.695, date: "Mar 2024" },
      { contest: "Weekly 419", rating: 1447.508, date: "Mar 2024" },
      { contest: "Biweekly 143", rating: 1472.96, date: "Apr 2024" },
      { contest: "Weekly 423", rating: 1510.59, date: "Apr 2024" },
      { contest: "Biweekly 144", rating: 1535.752, date: "Apr 2024" },
      { contest: "Biweekly 147", rating: 1552.45, date: "May 2024" }
    ],
    color: '#4CAF50',
    label: 'LeetCode',
    bgColor: 'rgba(76, 175, 80, 0.05)'
  },
  codeforces: {
    data: [
      { contest: "Round 981", rating: 420, date: "Mar 2024" },
      { contest: "Round 988", rating: 712, date: "Apr 2024" }
    ],
    color: '#2196F3',
    label: 'Codeforces',
    bgColor: 'rgba(33, 150, 243, 0.05)'
  },
  codechef: {
    data: [
      { contest: "START155D", rating: 1074, date: "Feb 2024" },
      { contest: "START157D", rating: 1230, date: "Feb 2024" },
      { contest: "START158D", rating: 1330, date: "Mar 2024" },
      { contest: "START160D", rating: 1445, date: "Mar 2024" },
      { contest: "START165C", rating: 1516, date: "Apr 2024" },
      { contest: "START166C", rating: 1496, date: "Apr 2024" },
      { contest: "START167C", rating: 1571, date: "May 2024" }
    ],
    color: '#FF9800',
    label: 'CodeChef',
    bgColor: 'rgba(255, 152, 0, 0.05)'
  }
};

const RatingTrends = ({ className = "" }) => {
  const [activePlatform, setActivePlatform] = useState('leetcode');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 195, 92, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: function(context) {
            return context[0].raw.toFixed(0) + ' Rating';
          },
          label: function(context) {
            return context.label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        }
      },
      y: {
        grid: {
          color: 'rgba(243, 244, 246, 0.08)',
          drawBorder: false,
        },
        ticks: {
          font: {
            // size: 12
          },
          color: '#6B7280',
          padding: 8
        },
        border: {
          display: false,
        }
      }
    },
    elements: {
      line: {
        tension: 0.3
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white'
      }
    }
  };

  const data = {
    labels: platformConfigs[activePlatform].data.map(item => item.contest),
    datasets: [
      {
        label: 'Rating',
        data: platformConfigs[activePlatform].data.map(item => item.rating),
        fill: 'origin',
        borderColor: 'rgb(192, 138, 219)',
        backgroundColor: "rgba(192, 138, 219, 0.4)",
        borderWidth: 2,
      }
    ],
  };

  const getLatestData = () => {
    const data = platformConfigs[activePlatform].data;
    return data[data.length - 1];
  };

  const getRatingChange = () => {
    const ratings = platformConfigs[activePlatform].data.map(item => item.rating);
    const change = ratings[ratings.length - 1] - ratings[ratings.length - 2];
    return change.toFixed(1);
  };

  return (
    <div className={`${className} bg-white w-full mx-auto shadow-lg rounded-xl overflow-hidden
                    transition-all duration-300 ease-in-out hover:shadow-xl`}>
      <div className="px-8 pt-7 pb-4">
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-left space-x-3">
              <div className="text-3xl text-gray-600" style={{ fontFamily: 'fairway-medium' }}>
                {getLatestData().rating.toFixed(0)}
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                getRatingChange() >= 0 
                  ? 'bg-green-50' 
                  : 'bg-red-50'
              }`}>
                {getRatingChange() >= 0 
                  ? <TrendingUp className="w-4 h-4 text-green-600" />
                  : <TrendingDown className="w-4 h-4 text-red-600" />
                }
                <span className={`text-sm font-semibold ${
                  getRatingChange() >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {getRatingChange() >= 0 ? '+' : ''}{getRatingChange()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="inline-flex rounded-lg p-[5px] bg-blue-100 transition">
              {Object.entries(platformConfigs).map(([platform, config]) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ease-in-out
                    ${activePlatform === platform
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5">
        <div className="h-[290px] w-full">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default RatingTrends;