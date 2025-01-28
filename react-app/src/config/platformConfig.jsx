import atcoderIcon from '../assets/atCoder.svg';
import codechefIcon from '../assets/codechef.svg';
import codeforcesIcon from '../assets/code-forces.svg';
import gfgIcon from '../assets/GeeksforGeeks.svg';
import leetcodeIcon from '../assets/leetcode.svg';

export const platforms = [
  { id: 'leetcode', name: 'LeetCode' },
  { id: 'codeforces', name: 'CodeForces' },
  { id: 'atcoder', name: 'AtCoder' },
  { id: 'codechef', name: 'CodeChef' },
  { id: 'geeksforgeeks', name: 'GeeksForGeeks' }
];

export const platformColors = (platform) => {
  const colors = {
    'leetcode': { bg: 'bg-[#e7a41f]', border: 'border-[#e7a41f]', bgo: 'bg-[#fcba35]/60' },
    'codeforces': { bg: 'bg-[#f44336]', border: 'border-[#f44336]', bgo: 'bg-[#f44336]/60' },
    'atcoder': { bg: 'bg-[#19cfe7]', border: 'border-[#19cfe7]', bgo: 'bg-[#19cfe7]/60' },
    'codechef': { bg: 'bg-[#e47c84]', border: 'border-[#e47c84]', bgo: 'bg-[#d97179]/50' },
    'geeksforgeeks': { bg: 'bg-[#308c44]', border: 'border-[#308c44]', bgo: 'bg-[#00bd29]/60' }
  };

  return colors[platform.toLowerCase()] || { bg: 'bg-gray-500', border: 'border-purple-200', bgo: 'bg-purple-200/60' };
}; 

export const platformLogos = {
  'leetcode': leetcodeIcon,
  'codeforces': codeforcesIcon,
  'atcoder': atcoderIcon,
  'codechef': codechefIcon,
  'geeksforgeeks': gfgIcon
};