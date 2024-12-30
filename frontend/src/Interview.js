import React from 'react';

function Interview() {
  return (
    <div className="interview">
      <h2>Interview Preparation</h2>
      <p>Prepare for your technical and behavioral interviews with the following resources and tips:</p>
      
      <h3>1. Common Interview Questions</h3>
      <ul>
        <li>Tell me about yourself.</li>
        <li>What are your strengths and weaknesses?</li>
        <li>Why do you want to work with us?</li>
        <li>Describe a challenging problem you solved.</li>
        <li>Where do you see yourself in 5 years?</li>
      </ul>
      
      <h3>2. Technical Interview Tips</h3>
      <p>Technical interviews typically focus on problem-solving, coding, and algorithms. Here are some key tips:</p>
      <ul>
        <li>Review common data structures and algorithms (e.g., arrays, linked lists, trees, graphs, sorting algorithms, etc.).</li>
        <li>Practice solving problems on platforms like LeetCode, HackerRank, or CodeSignal.</li>
        <li>Learn how to approach problem-solving by discussing the problem with the interviewer before jumping into code.</li>
        <li>Practice writing clean and optimized code with proper test cases.</li>
      </ul>
      
      <h3>3. Behavioral Interview Tips</h3>
      <p>Behavioral interviews assess your fit with the company and culture. Be prepared to answer situational questions like:</p>
      <ul>
        <li>Give an example of a time you showed leadership.</li>
        <li>How do you handle failure?</li>
        <li>Describe a time when you had to work with a difficult team member.</li>
      </ul>
      
      <h3>4. Interview Prep Resources</h3>
      <ul>
        <li><a href="https://www.crackingthecodinginterview.com" target="_blank" rel="noopener noreferrer">Cracking the Coding Interview</a> - A must-read book for coding interviews.</li>
        <li><a href="https://www.geeksforgeeks.org" target="_blank" rel="noopener noreferrer">GeeksforGeeks</a> - Tutorials, problems, and solutions on algorithms and data structures.</li>
        <li><a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">LeetCode</a> - A platform for practicing coding problems.</li>
      </ul>
    </div>
  );
}

export default Interview;
