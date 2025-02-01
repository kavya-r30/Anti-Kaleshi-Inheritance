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

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const profileRes = await fetch(`${backendUrl}/api/profile`, {
        credentials: 'include'
      });
      const profile = await profileRes.json();
      
      const results = {};

      if (profile?.profile?.platforms) {
        const platforms = profile.profile.platforms;
        const apiUrl = import.meta.env.VITE_USER_API_URL;
        if (Object.values(platforms).some(v => v)) {
          try {
            const platformRes = await fetch(
              `${apiUrl}/user?${new URLSearchParams({
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
        const apiUrl = import.meta.env.VITE_USER_API_URL;
        try {
          const githubRes = await fetch(
            `${apiUrl}/github/${githubUsername}`
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