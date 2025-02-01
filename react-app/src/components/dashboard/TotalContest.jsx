import React, { useState, useEffect, useMemo } from 'react';
import leetcode from '../../assets/leetcode.svg';
import codeforces from '../../assets/code-forces.svg';
import codechef from '../../assets/codechef.svg';

export const TotalContest = (userData) => {
    const [isVisible, setIsVisible] = useState(false);
    const data = useMemo(() => userData.userData, [userData]);

    const leetcodeContest = data?.leetcode?.contests?.stats?.attended || 0;
    const codechefContest = data?.codechef?.contests?.length || 0;
    const codeforcesContest = data?.codeforces?.contests?.length || 0;
    const totalContest = leetcodeContest + codechefContest + codeforcesContest;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="bg-white flex gap-4 p-6 shadow-lg rounded-xl h-full
                        transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="grid grid-cols-7 gap-6 w-full items-center justify-center">
                <div className="col-span-2 pl-2 flex flex-col items-center justify-center">
                    <div className="text-lg text-gray-500 font-semibold ">Total</div>
                    <div className="text-lg text-gray-500 font-semibold mb-2">Contest</div>
                    <div className="text-6xl text-gray-600" style={{ fontFamily: 'fairway-medium' }}>{totalContest}</div>
                </div>
                <div className="flex flex-col col-span-5 pr-2 space-y-2">
                    <div className={`flex items-center justify-between bg-gradient-to-r from-blue-200 to-blue-100 p-2
                            border border-gray-200 rounded-lg transition-all transform duration-500 ease-out hover:shadow
                            cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                            style={{ transitionDelay: `${0 * 150}ms` }}>
                        <div className='flex items-center pl-1'>
                            <div className='w-4 h-4'><img src={leetcode} alt="leetcode logo" /></div>
                            <div className="flex items-center justify-between pl-2">Leetcode</div>
                        </div>
                        <div className='text-gray-600 pr-2' style={{fontFamily: 'fairway-medium'}}>{leetcodeContest}</div>
                    </div>
                    <div className={`flex items-center justify-between bg-gradient-to-r from-blue-200 to-blue-100 p-2
                            border border-gray-200 rounded-lg transition-all transform duration-500 ease-out hover:shadow
                            cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                            style={{ transitionDelay: `${1 * 150}ms` }}>
                        <div className='flex items-center pl-1'>
                            <div className='w-4 h-4'><img src={codechef} alt="codechef logo" /></div>
                            <div className="flex items-center justify-between pl-2">Codechef</div>
                        </div>
                        <div className='text-gray-600 pr-2' style={{fontFamily: 'fairway-medium'}}>{codechefContest}</div>
                    </div>
                    <div className={`flex items-center justify-between bg-gradient-to-r from-blue-200 to-blue-100 p-2
                            border border-gray-200 rounded-lg transition-all transform duration-500 ease-out hover:shadow
                            cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                            style={{ transitionDelay: `${2 * 150}ms` }}>
                        <div className='flex items-center pl-1'>
                            <div className='w-4 h-4'><img src={codeforces} alt="codeforces logo" /></div>
                            <div className="flex items-center justify-between pl-2">Codeforces</div>
                        </div>
                        <div className='text-gray-600 pr-2' style={{fontFamily: 'fairway-medium'}}>{codeforcesContest}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}