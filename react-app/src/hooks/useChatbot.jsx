import { useState, useEffect } from 'react';

export const useProfileData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const CACHE_KEY = 'profile_data_cache';
  const CACHE_DURATION = 1 * 60 * 1000;

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      const profileRes = await fetch('http://localhost:5001/api/profile', {
        credentials: 'include'
      });
      const profile = await profileRes.json();
      
      const results = {};

      if (profile?.profile?.platforms) {
        const platforms = profile.profile.platforms;
        if (Object.values(platforms).some(v => v)) {
          try {
            const platformRes = await fetch(
              `https://user-api-kavya.onrender.com/api/user?${new URLSearchParams({
                lc: platforms.leetcode || '',
                cf: platforms.codeforces || '',
                cc: platforms.codechef || '',
                gfg: platforms.geeksforgeeks || '',
                atc: platforms.atcoder || ''
              })}`
            );
            if (platformRes.ok) {
              results.platforms = await platformRes.json();
            }
          } catch (err) {
            console.log('Platform data fetch failed');
          }
        }
      }

      const githubUsername = profile?.profile?.socialLinks?.github;
      if (githubUsername) {
        try {
          const githubRes = await fetch(
            `https://user-api-kavya.onrender.com/api/github/${githubUsername}`
          );
          if (githubRes.ok) {
            results.github = await githubRes.json();
          }
        } catch (err) {
          console.log('GitHub data fetch failed');
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: results,
        timestamp: Date.now()
      }));

      setData(results);
    } catch (err) {
      console.log('Profile fetch failed silently');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refresh };
};