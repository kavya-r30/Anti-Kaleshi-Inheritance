import '../fonts.css';
import React from "react";
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

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      <main className="max-w-screen-xl mx-auto px-24 py-4 pb-8">
        <Header />

        <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-5">
                <TotalContest />
            </div>
            <div className='col-span-7'>
                <Heatmap />
            </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6 h-full">
          <div className="col-span-7 min-h-full">
            <div className="pb-6 h-fit">
              <RatingTrends />
            </div>
            <div className=''>
              <BadgesDisplay />
            </div>
          </div>
          <div className="col-span-5 min-h-full">
            <ProblemsSolved />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1 h-fit"> 
            <Skillset />
          </div>
          <div className="flex flex-col col-span-1 h-full">
            <div className='pb-6 h-fit'>
              <DailyQuestion />
            </div>
            <div className='h-full'>
              <MaxRating />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
