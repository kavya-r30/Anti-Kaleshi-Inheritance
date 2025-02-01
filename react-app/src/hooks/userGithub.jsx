import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGithubData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [githubUsername, setGithubUsername] = useState('');

  const CACHE_KEY = 'github_data_cache';
  const CACHE_DURATION = 1 * 60 * 1000; // 1 minutes

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

  const fetchUsername = async () => {
    const response = await axios.get('http://localhost:5001/api/profile', {
      withCredentials: true
    });
    
    if (!response.data.profile || !response.data.profile.socialLinks || !response.data.profile.socialLinks.github) {
      throw new Error('No GitHub username found');
    }
    
    return response.data.profile.socialLinks.github;
  };

  const fetchGithubData = async (username = null) => {
    try {
      let validUsername = username;

      if (!validUsername) {
        validUsername = await fetchUsername();
        setGithubUsername(validUsername);
      }

      if (!validUsername) {
        throw new Error('No GitHub username available');
      }

      const response = await fetch(
        `https://user-api-kavya.onrender.com/api/github/${validUsername}`,
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
      return { githubData: data, githubUsername: validUsername };
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      throw error;
    }
  };

  const fetchGithubInfo = async () => {
    try {
      setLoading(true);
      
      const cachedData = getCachedData();
      if (cachedData) {
        setGithubUsername(cachedData.githubUsername);
        setGithubData(cachedData.githubData);
        setLoading(false);
        return;
      }

      const { githubData: fetchedData, githubUsername: fetchedUsername } = await fetchGithubData();
      
      setGithubData(fetchedData);
      setGithubUsername(fetchedUsername);
      
      setCachedData({
        githubUsername: fetchedUsername,
        githubData: fetchedData
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load GitHub data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchGithubInfo();
  };

  useEffect(() => {
    fetchGithubInfo();
  }, []);

  return {
    loading,
    error,
    githubData,
    githubUsername,
    refreshData
  };
};