import React from 'react';

function Interview() {
  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Interview Preparation</h2>
      <p className="mb-4">Prepare for your technical and behavioral interviews with the following resources and tips:</p>
      
      <h3 className="text-xl font-bold mb-2">1. Common Interview Questions</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Tell me about yourself.</li>
        <li>What are your strengths and weaknesses?</li>
        <li>Why do you want to work with us?</li>
        <li>Describe a challenging problem you solved.</li>
        <li>Where do you see yourself in 5 years?</li>
      </ul>
      
      <h3 className="text-xl font-bold mb-2">2. Technical Interview Tips</h3>
      <p className="mb-4">Technical interviews typically focus on problem-solving, coding, and algorithms. Here are some key tips:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Review common data structures and algorithms (e.g., arrays, linked lists, trees, graphs, sorting algorithms, etc.).</li>
        <li>Practice solving problems on platforms like LeetCode, HackerRank, or CodeSignal.</li>
        <li>Learn how to approach problem-solving by discussing the problem with the interviewer before jumping into code.</li>
        <li>Practice writing clean and optimized code with proper test cases.</li>
      </ul>
      
      <h3 className="text-xl font-bold mb-2">3. Behavioral Interview Tips</h3>
      <p className="mb-4">Behavioral interviews assess your fit with the company and culture. Be prepared to answer situational questions like:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Give an example of a time you showed leadership.</li>
        <li>How do you handle failure?</li>
        <li>Describe a time when you had to work with a difficult team member.</li>
      </ul>
      
      <h3 className="text-xl font-bold mb-2">4. Interview Prep Resources</h3>
      <ul className="list-disc list-inside mb-4">
        <li><a href="https://www.crackingthecodinginterview.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Cracking the Coding Interview</a> - A must-read book for coding interviews.</li>
        <li><a href="https://www.geeksforgeeks.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">GeeksforGeeks</a> - Tutorials, problems, and solutions on algorithms and data structures.</li>
        <li><a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">LeetCode</a> - A platform for practicing coding problems.</li>
      </ul>
    </div>
  );
}

export default Interview;