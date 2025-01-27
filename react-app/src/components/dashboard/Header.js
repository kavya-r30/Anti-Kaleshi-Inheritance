import React, { useState, useEffect } from 'react';
import { data } from '../data'
import { Trophy, Code2, Target } from 'lucide-react';

export const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    const totalSolved = ( data.leetcode?.profile?.totalSolved || 0 ) + ( data.codeforces?.profile?.totalSolved || 0 ) +
                        ( data.codechef?.profile?.totalSolved || 0 ) + ( data.geeksforgeeks?.profile?.totalSolved || 0 );

    let totalSubmission = data?.codeforces?.profile?.totalSubmissions || 0;
    Object.values(data?.heatmap)?.forEach(timestamp => {
        totalSubmission += timestamp.total;
    });

    const activeDays = Object.keys(data?.heatmap)?.length || 0;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
                        transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="bg-blue-100 p-3 rounded-full">
                <Trophy className="w-6 h-6 text-blue-500" />
            </div>
            <div className='grid grid-cols-3 gap-4 items-center'>
                <div className="text-md text-gray-500 font-semibold">Total Questions</div>
                <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
                    ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ fontFamily: 'Fairway-medium' }}>{ totalSolved }</div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
                        transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="bg-green-100 p-3 rounded-full">
                <Code2 className="w-6 h-6 text-green-500" />
            </div>
            <div className='grid grid-cols-3 gap-4 items-center'>
                <div className="text-md text-gray-500 font-semibold">Total Submissions</div>
                <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
                    ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ fontFamily: 'Fairway-medium' }}>{ totalSubmission }</div>
            </div>
          </div>

          <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
                            transition-all duration-300 ease-in-out hover:shadow-xl">
            <div className="bg-purple-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-purple-500" />
            </div>
            <div className='grid grid-cols-3 gap-4 items-center'>
                <div className="text-md text-gray-500 font-semibold">Active Days</div>
                <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
                    ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ fontFamily: 'Fairway-medium' }}>{ activeDays }</div>
            </div>
          </div>
        </div>
    );
};

// import React, { useState, useEffect } from 'react';
// import { data } from '../data';
// import { Trophy, Code2, Target } from 'lucide-react';

// export const Header = () => {
//     const [isVisible, setIsVisible] = useState(false);

//     // Safely calculate total solved
//     const totalSolved = 
//         (data?.leetcode?.profile?.totalSolved || 0) +
//         (data?.codeforces?.profile?.totalSolved || 0) +
//         (data?.codechef?.profile?.totalSolved || 0) +
//         (data?.geeksforgeeks?.profile?.totalSolved || 0);

//     // Safely calculate total submissions
//     let totalSubmission = data?.codeforces?.profile?.totalSubmissions || 0;
//     if (data?.heatmap) {
//         Object.values(data.heatmap).forEach(timestamp => {
//             totalSubmission += timestamp?.total || 0; // Handle undefined timestamp
//         });
//     }

//     // Safely calculate active days
//     const activeDays = data?.heatmap ? Object.keys(data.heatmap).length : 0;

//     useEffect(() => {
//         setIsVisible(true);
//     }, []);

//     return (
//         <div className="grid grid-cols-3 gap-6 mb-6">
//             {/* Total Questions */}
//             <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
//                 transition-all duration-300 ease-in-out hover:shadow-xl">
//                 <div className="bg-blue-100 p-3 rounded-full">
//                     <Trophy className="w-6 h-6 text-blue-500" />
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 items-center">
//                     <div className="text-md text-gray-500 font-semibold">Total Questions</div>
//                     <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
//                         ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
//                         style={{ fontFamily: 'Fairway-medium' }}>
//                         {totalSolved}
//                     </div>
//                 </div>
//             </div>

//             {/* Total Submissions */}
//             <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
//                 transition-all duration-300 ease-in-out hover:shadow-xl">
//                 <div className="bg-green-100 p-3 rounded-full">
//                     <Code2 className="w-6 h-6 text-green-500" />
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 items-center">
//                     <div className="text-md text-gray-500 font-semibold">Total Submissions</div>
//                     <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
//                         ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
//                         style={{ fontFamily: 'Fairway-medium' }}>
//                         {totalSubmission}
//                     </div>
//                 </div>
//             </div>

//             {/* Active Days */}
//             <div className="p-6 flex items-center justify-center space-x-4 bg-white shadow-lg rounded-xl
//                 transition-all duration-300 ease-in-out hover:shadow-xl">
//                 <div className="bg-purple-100 p-3 rounded-full">
//                     <Target className="w-6 h-6 text-purple-500" />
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 items-center">
//                     <div className="text-md text-gray-500 font-semibold">Active Days</div>
//                     <div className={`text-6xl text-gray-600 col-span-2 text-right transition-all duration-500 
//                         ease-out transform ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
//                         style={{ fontFamily: 'Fairway-medium' }}>
//                         {activeDays}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
