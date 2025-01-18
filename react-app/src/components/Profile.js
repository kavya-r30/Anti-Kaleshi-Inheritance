import React, { useState } from 'react';
import { LogOut, Edit2, Save, Check, Trash2 } from 'lucide-react';

const ProfilePage = ({ user = {
  name: "XYZ",
  email: "xyz@gmail.com",
  country: "India",
  picture: "https://",
  bio: "Full Stack Developer with passion for problem solving and competitive programming.",
  education: {
    degree: "B.Tech Computer Science",
    university: "University",
    year: "2024-2028"
  }
}}) => {
  const platforms = {
    leetcode: 'https://leetcode.com/u/',
    codeforces: 'https://codeforces.com/profile/',
    codechef: 'https://www.codechef.com/users/',
    geeksforgeeks: 'https://www.geeksforgeeks.org/user/',
    atcoder: 'https://atcoder.jp/users/'
  };

  const socialPlatforms = {
    linkedin: 'https://www.linkedin.com/in/',
    twitter: 'https://twitter.com/',
    github: 'https://github.com/',
    resume: 'https://'
  };

  const [platformUsernames, setPlatformUsernames] = useState({
    leetcode: '',
    codeforces: '',
    codechef: '',
    geeksforgeeks: '',
    atcoder: ''
  });

  const [editBio, setEditBio] = useState(false);
  const [bioText, setBioText] = useState(user.bio);
  const [education, setEducation] = useState(user.education);
  const [platformEdits, setPlatformEdits] = useState({});
  const [socialEdits, setSocialEdits] = useState({});
  
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    twitter: '',
    linkedin: '',
    resume: ''
  });

  const handlePlatformChange = (platform, value) => {
    setPlatformUsernames({
      ...platformUsernames,
      [platform]: value
    });
    setPlatformEdits({
      ...platformEdits,
      [platform]: true
    });
  };

  const handleSocialChange = (platform, value) => {
    setSocialLinks({
      ...socialLinks,
      [platform]: value
    });
    setSocialEdits({
      ...socialEdits,
      [platform]: true
    });
  };

  const handleSave = (type, platform) => {
    if (type === 'platform') {
      setPlatformEdits({
        ...platformEdits,
        [platform]: false
      });
    } else {
      setSocialEdits({
        ...socialEdits,
        [platform]: false
      });
    }
  };

  const handleDelete = (type, platform) => {
    if (type === 'platform') {
      setPlatformUsernames({
        ...platformUsernames,
        [platform]: ''
      });
      setPlatformEdits({
        ...platformEdits,
        [platform]: false
      });
    } else {
      setSocialLinks({
        ...socialLinks,
        [platform]: ''
      });
      setSocialEdits({
        ...socialEdits,
        [platform]: false
      });
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-gray-900">
      <main className="max-w-screen-xl mx-auto px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-4 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-center">
                <img 
                  src={user.picture}
                  alt={user.name}
                  className="w-52 h-52 rounded-full border-[6px] border-blue-100 dark:border-blue-900 shadow-lg mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-1">{user.email}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-3">📍 {user.country}</p>
                <button className="w-full px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Education</h2>
              <div className="space-y-3">
                {Object.entries(education).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setEducation({ ...education, [key]: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bio</h2>
                <button 
                  onClick={() => setEditBio(!editBio)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {editBio ? <Save size={18} /> : <Edit2 size={18} />}
                </button>
              </div>
              {editBio ? (
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{bioText}</p>
              )}
            </div>
          </div>

          <div className="col-span-8 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Platform IDs</h2>
              <div className="space-y-3">
                {Object.entries(platforms).map(([platform, baseUrl]) => (
                  <div key={platform} className="space-y-1">
                    <label className="block font-medium capitalize text-gray-700 dark:text-gray-300">
                      {platform}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-1 items-center">
                        <span className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-sm">
                          {baseUrl}
                        </span>
                        <input
                          type="text"
                          value={platformUsernames[platform]}
                          onChange={(e) => handlePlatformChange(platform, e.target.value)}
                          className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter username"
                        />
                      </div>
                      {platformEdits[platform] && (
                        <>
                          <button 
                            onClick={() => handleSave('platform', platform)}
                            className="p-2 text-green-600 hover:text-green-700"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete('platform', platform)}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Social Profiles</h2>
              <div className="space-y-3">
                {Object.entries(socialPlatforms).map(([platform, baseUrl]) => (
                  <div key={platform} className="space-y-1">
                    <label className="block font-medium capitalize text-gray-700 dark:text-gray-300">
                      {platform}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-1 items-center">
                        <span className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-sm">
                          {baseUrl}
                        </span>
                        <input
                          type="text"
                          value={socialLinks[platform]}
                          onChange={(e) => handleSocialChange(platform, e.target.value)}
                          className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter username"
                        />
                      </div>
                      {socialEdits[platform] && (
                        <>
                          <button 
                            onClick={() => handleSave('social', platform)}
                            className="p-2 text-green-600 hover:text-green-700"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete('social', platform)}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;