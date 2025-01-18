import leetcode from '../../assets/leetcode.svg'
import codeforces from '../../assets/code-forces.svg'
import codechef from '../../assets/codechef.svg'

export const TotalContest = () => {
    return (
        <div className="flex gap-4 p-6 bg-white shadow-lg rounded-xl h-full">
            <div className="grid grid-cols-7 gap-6 w-full items-center justify-center">
                <div className="col-span-2 pl-2 flex flex-col items-center justify-center">
                    <div className="text-lg text-gray-500 font-semibold ">Total</div>
                    <div className="text-lg text-gray-500 font-semibold mb-2">Contest</div>
                    <div className="text-6xl text-gray-600" style={{ fontFamily: 'fairway-medium' }}>19</div>
                </div>
                <div className="flex flex-col col-span-5 pr-2 space-y-2">
                    <div className="flex items-center justify-between bg-purple-100 p-2 border border-gray-200 rounded-lg">
                        <div className='flex items-center pl-1'>
                            <div className='w-4 h-4'><img src={leetcode} alt="leetcode logo" /></div>
                            <div className="flex items-center justify-between pl-2">Leetcode</div>
                        </div>
                        <div className='text-gray-600 pr-2' style={{fontFamily: 'fairway-medium'}}>19</div>
                    </div>
                    <div className="flex items-center justify-between bg-purple-100 p-2 border border-gray-200 rounded-lg">
                        <div className='flex items-center pl-1'>
                            <div className='w-4 h-4'><img src={codechef} alt="codechef logo" /></div>
                            <div className="flex items-center justify-between pl-2">Codechef</div>
                        </div>
                        <div className='text-gray-600 pr-2' style={{fontFamily: 'fairway-medium'}}>19</div>
                    </div>
                    <div className="flex items-center justify-between bg-purple-100 p-2 border border-gray-200 rounded-lg">
                        <div className='flex items-center pl-1'>
                            <div className='w-4 h-4'><img src={codeforces} alt="codeforces logo" /></div>
                            <div className="flex items-center justify-between pl-2">Codeforces</div>
                        </div>
                        <div className='text-gray-600 pr-2' style={{fontFamily: 'fairway-medium'}}>19</div>
                    </div>
                </div>
            </div>
        </div>
    );
}