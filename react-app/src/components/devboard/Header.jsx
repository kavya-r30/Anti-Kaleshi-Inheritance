import React, { useState, useEffect, useMemo } from 'react';
import { Github, GitCommitVertical, GitPullRequestArrow } from 'lucide-react';

export const Header = (githubData) => {
    const [isVisible, setIsVisible] = useState(false);
    const data = useMemo(() => githubData.githubData, [githubData]);

    const totalContribution = data?.profile?.totalContributions || 0;
    const totalCommits = data?.profile?.totalCommits || 0;
    const totalPull = data?.profile?.totalPRs || 0;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
                        transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="bg-blue-100 p-3 rounded-full">
                <Github className="w-6 h-6 text-blue-500" />
            </div>
            <div className='grid grid-cols-3 gap-4 items-center'>
                <div className="text-md text-gray-500 font-semibold">Total Contribution</div>
                <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
                    ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ fontFamily: 'Fairway-medium' }}>{ totalContribution }</div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
                        transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="bg-green-100 p-3 rounded-full">
                <GitCommitVertical className="w-6 h-6 text-green-500" />
            </div>
            <div className='grid grid-cols-3 gap-4 items-center'>
                <div className="text-md text-gray-500 font-semibold">Total Commits</div>
                <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
                    ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ fontFamily: 'Fairway-medium' }}>{ totalCommits }</div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
                            transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="bg-purple-100 p-3 rounded-full">
                <GitPullRequestArrow className="w-6 h-6 text-purple-500" />
            </div>
            <div className='grid grid-cols-3 gap-4 items-center'>
                <div className="text-md text-gray-500 font-semibold">Total Pull Request</div>
                <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
                    ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ fontFamily: 'Fairway-medium' }}>{ totalPull }</div>
            </div>
          </div>
        </div>
    );
};