import '../fonts.css';
import React from "react";
import Heatmap from './devboard/Heatmap'
import { Header } from './devboard/Header';
import Projects from './devboard/Projects';

export const Devboard = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      <main className="max-w-screen-xl mx-auto px-24 py-4 pb-8">
        <Header />

        <div className="gap-6 mb-6">
            <div className='col-span-7'>
                <Heatmap />
            </div>
        </div>

        <Projects />
      </main>
    </div>
  );
};
