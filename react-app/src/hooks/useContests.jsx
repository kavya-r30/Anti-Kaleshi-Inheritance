import { useState, useEffect } from 'react';
import { isUpcoming } from '../utils/dates';

export const useContests = (currentDate, searchTerm, selectedPlatforms) => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContests = async (startDate, endDate) => {
    setLoading(true);
    try {
      const encodedStartDate = encodeURIComponent(startDate.toISOString());
      const encodedEndDate = encodeURIComponent(endDate.toISOString());
      const response = await fetch(
        `https://node.codolio.com/api/contest-calendar/v1/all/get-contests?startDate=${encodedStartDate}&endDate=${encodedEndDate}`
      );
      const data = await response.json();
      setContests(data.data || []);
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    fetchContests(startDate, endDate);
  }, [currentDate]);

  const filteredContests = contests
    .filter(contest => {
      const matchesSearch = contest.contestName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatforms[contest.platform.toLowerCase()];
      return matchesSearch && matchesPlatform && isUpcoming(contest.contestStartDate);
    })
    .sort((a, b) => new Date(a.contestStartDate) - new Date(b.contestStartDate));

  return { contests, loading, filteredContests };
};