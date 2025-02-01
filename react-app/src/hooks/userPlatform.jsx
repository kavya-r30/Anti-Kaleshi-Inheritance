import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePlatformData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [platformUsernames, setPlatformUsernames] = useState({
    leetcode: '',
    codeforces: '',
    codechef: '',
    geeksforgeeks: '',
    atcoder: '',
  });

  const CACHE_KEY = 'platform_data_cache';
  const CACHE_DURATION = 1 * 60 * 1000;

  const getCachedData = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
      localStorage.removeItem(CACHE_KEY);
    }
    return null;
  };

  const setCachedData = (data) => {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  const hasValidUsernames = (usernames) => {
    return Object.values(usernames).some(username => username !== '');
  };

  const fetchUsernames = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/api/profile`, {
      withCredentials: true
    });
    
    if (!response.data.profile || !response.data.profile.platforms) {
      throw new Error('No profile data found');
    }
    
    return response.data.profile.platforms;
  };

  const fetchUserData = async (usernames = null) => {
    try {
      let validUsernames = usernames;

      if (!validUsernames || !hasValidUsernames(validUsernames)) {
        validUsernames = await fetchUsernames();
        // console.log(validUsernames);
        setPlatformUsernames(validUsernames);
      }
      const apiUrl = import.meta.env.VITE_USER_API_URL;
      const response = await fetch(
        `${apiUrl}/user?lc=${validUsernames.leetcode}&cf=${validUsernames.codeforces}&cc=${validUsernames.codechef}&gfg=${validUsernames.geeksforgeeks}&atc=${validUsernames.atcoder}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { userData: data, platformUsernames: validUsernames };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const fetchPlatformUsernames = async () => {
    try {
      setLoading(true);
      
      const cachedData = getCachedData();
      if (cachedData) {
        setPlatformUsernames(cachedData.platformUsernames);
        setUserData(cachedData.userData);
        setLoading(false);
        return;
      }

      const { userData: fetchedUserData, platformUsernames: fetchedUsernames } = await fetchUserData();
      
      setUserData(fetchedUserData);
      setPlatformUsernames(fetchedUsernames);
      
      setCachedData({
        platformUsernames: fetchedUsernames,
        userData: fetchedUserData
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load platform data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchPlatformUsernames();
  };

  useEffect(() => {
    fetchPlatformUsernames();
  }, []);

  return {
    loading,
    error,
    userData,
    platformUsernames,
    refreshData
  };
};