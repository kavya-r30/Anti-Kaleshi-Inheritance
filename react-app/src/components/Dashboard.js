import '../fonts.css';
import React from "react";
import Heatmap from './dashboard/Heatmap'
import { Header } from './dashboard/Header';
import { TotalContest } from './dashboard/TotalContest'

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      <main className="max-w-screen-xl mx-auto px-24 py-4">
        <Header />

        <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-5">
                <TotalContest />
            </div>
            <div className='col-span-7'>
                <Heatmap />
            </div>
        </div>
      </main>
    </div>
  );
};
