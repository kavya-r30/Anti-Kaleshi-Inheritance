import React, { useState, useEffect } from 'react';
import { LogOut, Edit2, Save, Check, Trash2 } from 'lucide-react';
import axios from 'axios';

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all transform translate-y-0 z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white flex items-center gap-2`}>
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-80">×</button>
  </div>
);

const ProfilePage = () => {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    country: '',
    picture: '',
    bio: ''
  });
  
  const [platformUsernames, setPlatformUsernames] = useState({
    leetcode: '',
    codeforces: '',
    codechef: '',
    geeksforgeeks: '',
    atcoder: ''
  });

  const [editBio, setEditBio] = useState(false);
  const [bioText, setBioText] = useState('');
  const [education, setEducation] = useState({
    degree: '',
    university: '',
    year: ''
  });
  
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    twitter: '',
    linkedin: '',
    resume: ''
  });

  const [platformEdits, setPlatformEdits] = useState({});
  const [socialEdits, setSocialEdits] = useState({});

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/profile`, {
        withCredentials: true
      });
      
      const { profile } = response.data;
      
      setUserData({
        name: profile.name || '',
        email: profile.email || '',
        country: profile.country || '',
        picture: profile.picture || '',
        bio: profile.bio || ''
      });
      
      setPlatformUsernames(profile.platforms || {});
      setSocialLinks(profile.socialLinks || {});
      setBioText(profile.bio || '');
      setEducation(profile.education || {});
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');
      setLoading(false);
      showToast('Failed to load profile data', 'error');
    }
  };

  const handleLogout = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.get(`${backendUrl}/auth/logout`, {
        withCredentials: true
      });
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      showToast('Logout failed', 'error');
    }
  };

  const saveProfile = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      setLoading(true);
      await axios.put(`${backendUrl}/api/profile/update`, {
        platforms: platformUsernames,
        socialLinks,
        bio: bioText,
        education,
        country: userData.country
      }, {
        withCredentials: true
      });

      setPlatformEdits({});
      setSocialEdits({});
      setEditBio(false);
      setLoading(false);
      showToast('Profile updated successfully');
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile data');
      setLoading(false);
      showToast('Failed to update profile', 'error');
    }
  };

  const handlePlatformChange = (platform, value) => {
    setPlatformUsernames(prev => ({
      ...prev,
      [platform]: value
    }));
    setPlatformEdits(prev => ({
      ...prev,
      [platform]: true
    }));
  };

  const handleSocialChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
    setSocialEdits(prev => ({
      ...prev,
      [platform]: true
    }));
  };

  const handleSave = (type, platform) => {
    saveProfile();
  };

  const handleDelete = (type, platform) => {
    if (type === 'platform') {
      setPlatformUsernames(prev => ({
        ...prev,
        [platform]: ''
      }));
      setPlatformEdits(prev => ({
        ...prev,
        [platform]: false
      }));
    } else {
      setSocialLinks(prev => ({
        ...prev,
        [platform]: ''
      }));
      setSocialEdits(prev => ({
        ...prev,
        [platform]: false
      }));
    }
    saveProfile();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {loading && <LoadingSpinner />}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
      
      <main className="max-w-screen-xl mx-auto px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-[1.02]">
              <div className="text-center">
                <div className="relative inline-block">
                  <img 
                    src={userData.picture}
                    alt={userData.name}
                    className="w-52 h-52 rounded-full border-4 border-purple-200 shadow-lg mx-auto mb-4 object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20"></div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{userData.name}</h1>
                <p className="text-gray-600 mb-1">{userData.email}</p>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-all hover:from-red-600 hover:to-red-700 hover:shadow-lg"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-[1.02]">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {Object.entries(education).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setEducation({ ...education, [key]: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                ))}
                <button
                  onClick={saveProfile}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg flex items-center justify-center space-x-2 transition-all hover:from-purple-600 hover:to-blue-600 hover:shadow-lg"
                >
                  <Save size={18} />
                  <span>Save Education</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Bio</h2>
                <button 
                  onClick={() => setEditBio(!editBio)}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {editBio ? <Save size={18} /> : <Edit2 size={18} />}
                </button>
              </div>
              {editBio ? (
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600">{bioText || 'Add your bio'}</p>
              )}
            </div>
          </div>

          <div className="col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-[1.02]">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Platform IDs</h2>
              <div className="space-y-4">
                {Object.entries(platforms).map(([platform, baseUrl]) => (
                  <div key={platform} className="space-y-2">
                    <label className="block font-medium capitalize text-gray-700">
                      {platform}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-1 items-center">
                        <span className="text-gray-500 bg-gray-50 p-2 rounded-l-lg border border-r-0 border-gray-300 text-sm">
                          {baseUrl}
                        </span>
                        <input
                          type="text"
                          value={platformUsernames[platform] || ''}
                          onChange={(e) => handlePlatformChange(platform, e.target.value)}
                          className="flex-1 rounded-r-lg border border-gray-300 p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                          placeholder="Enter username"
                        />
                      </div>
                      {platformEdits[platform] && (
                        <>
                          <button 
                            onClick={() => handleSave('platform', platform)}
                            className="p-2 text-green-600 hover:text-green-700 transition-colors"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete('platform', platform)}
                            className="p-2 text-red-600 hover:text-red-700 transition-colors"
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

            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:scale-[1.02]">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Social Profiles</h2>
              <div className="space-y-4">
                {Object.entries(socialPlatforms).map(([platform, baseUrl]) => (
                  <div key={platform} className="space-y-2">
                    <label className="block font-medium capitalize text-gray-700">
                      {platform}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-1 items-center">
                        <span className="text-gray-500 bg-gray-50 p-2 rounded-l-lg border border-r-0 border-gray-300 text-sm">
                          {baseUrl}
                        </span>
                        <input
                          type="text"
                          value={socialLinks[platform] || ''}
                          onChange={(e) => handleSocialChange(platform, e.target.value)}
                          className="flex-1 rounded-r-lg border border-gray-300 p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                          placeholder="Enter username"
                        />
                      </div>
                      {socialEdits[platform] && (
                        <>
                          <button 
                            onClick={() => handleSave('social', platform)}
                            className="p-2 text-green-600 hover:text-green-700 transition-colors"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete('social', platform)}
                            className="p-2 text-red-600 hover:text-red-700 transition-colors"
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