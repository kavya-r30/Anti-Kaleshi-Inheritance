import '../fonts.css';
import { React, useMemo } from "react";
import Heatmap from './devboard/Heatmap'
import { Header } from './devboard/Header';
import Projects from './devboard/Projects';
import { useGithubData } from '../hooks/userGithub'

const LoadingSpinner = () => (
  <div className="bg-gradient-to-b from-purple-50 to-slate-50 flex w-full h-screen items-center justify-center p-8">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
  </div>
);

export const Devboard = () => {
  const { loading, error, githubData, githubUsername, refreshData } = useGithubData();
  const data = useMemo(() => githubData, [githubData]);

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
        <Header githubData={data} />

        <div className="gap-6 mb-6">
            <div className='col-span-7'>
                <Heatmap githubData={data} />
            </div>
        </div>

        <Projects githubData={data} />
      </main>
    </div>
  );
};
