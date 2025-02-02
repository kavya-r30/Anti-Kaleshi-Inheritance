import '../fonts.css';
import { React, useMemo } from "react";
import { data } from './data'
import Heatmap from './dashboard/Heatmap'
import { Header } from './dashboard/Header';
import { TotalContest } from './dashboard/TotalContest';
import RatingTrends from './dashboard/ContestRating';
import ProblemsSolved from './dashboard/ProblemSolved';
import BadgesDisplay from './dashboard/Badges';
import Skillset from './dashboard/SkillSet';
import DailyQuestion from './dashboard/Daily';
import MaxRating from './dashboard/MaxRating';
import { usePlatformData } from '../hooks/userPlatform'

const LoadingSpinner = () => (
  <div className="bg-gradient-to-b from-purple-50 to-slate-50 flex w-full h-screen items-center justify-center p-8">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
  </div>
);

export const Dashboard = () => {
  const { loading, error, userData, platformUsernames, refreshData } = usePlatformData();
  const data = useMemo(() => userData, [userData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-purple-50 flex items-center justify-center w-full h-screen">
        <div className="text-purple-600 text-center">
          <p className="text-2xl" style={{ fontFamily: 'Noto-bold' }} >Error: {error}</p>
          <button onClick={refreshData} className="mt-4 px-4 py-2 bg-purple-500 text-white 
            rounded-3xl hover:bg-purple-600"  
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <main className="max-w-screen-xl mx-auto px-24 py-4 pb-8">
        <Header userData={data} />

        <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-5">
                <TotalContest userData={userData} />
            </div>
            <div className='col-span-7'>
                <Heatmap userData={userData} />
            </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6 h-full">
          <div className="col-span-7 min-h-full">
            <div className="pb-6 h-fit">
              <RatingTrends userData={userData} />
            </div>
            <div className=''>
              <BadgesDisplay userData={userData} />
            </div>
          </div>
          <div className="col-span-5 min-h-full">
            <ProblemsSolved userData={userData} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1 h-fit"> 
            <Skillset userData={userData} />
          </div>
          <div className="flex flex-col col-span-1 h-full">
            <div className='pb-6 h-fit'>
              <DailyQuestion userData={userData} />
            </div>
            <div className='h-full'>
              <MaxRating userData={userData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
