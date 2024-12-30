import React from 'react';
import './LearningResources.css';

// const LearningResources = () => {
//   const studyGuideResources = {
//     DSA: [
//       { title: "Introduction to DSA", link: "https://example.com/dsa-intro" },
//       { title: "DSA - Arrays and Strings", link: "https://example.com/dsa-arrays" },
//       { title: "DSA - Linked Lists", link: "https://example.com/dsa-linked-lists" }
//     ],
//     Pandas: [
//       { title: "Pandas DataFrame Basics", link: "https://example.com/pandas-basics" },
//       { title: "Advanced Pandas Operations", link: "https://example.com/pandas-advanced" },
//       { title: "Pandas - Data Cleaning", link: "https://example.com/pandas-cleaning" }
//     ]
//   };

//   return (
//     <div className="study-guide-container">
//       <h2>Learning Resources</h2>
//       <div className="study-guide-section">
//         <h3>DSA Resources</h3>
//         <ul>
//           {studyGuideResources.DSA.map((resource, index) => (
//             <li key={index}>
//               <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                 {resource.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="study-guide-section">
//         <h3>Pandas Resources</h3>
//         <ul>
//           {studyGuideResources.Pandas.map((resource, index) => (
//             <li key={index}>
//               <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                 {resource.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LearningResources;

const LearningResources = () => {
    const learningResources = [
      {
        id: 1,
        topic: "Data Structures and Algorithms (DSA)",
        resources: [
          {
            id: 1,
            title: "GeeksforGeeks - DSA",
            link: "https://www.geeksforgeeks.org/data-structures/",
            description: "A comprehensive collection of data structures and algorithms tutorials."
          },
          {
            id: 2,
            title: "LeetCode - Algorithms",
            link: "https://leetcode.com/problemset/all/",
            description: "Practice coding problems related to algorithms and data structures."
          },
          {
            id: 3,
            title: "Cracking the Coding Interview",
            link: "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850",
            description: "A great book with detailed explanations of common coding interview questions."
          },
          {
            id: 4,
            title: "HackerRank - Algorithms",
            link: "https://www.hackerrank.com/domains/tutorials/10-days-of-algorithms",
            description: "Learn algorithms by solving challenges on HackerRank."
          }
        ]
      },
      {
        id: 2,
        topic: "Pandas (Python Library)",
        resources: [
          {
            id: 1,
            title: "Pandas Official Documentation",
            link: "https://pandas.pydata.org/pandas-docs/stable/",
            description: "The official documentation of the Pandas library."
          },
          {
            id: 2,
            title: "DataCamp - Pandas Tutorial",
            link: "https://www.datacamp.com/community/tutorials/pandas-tutorial-dataframe-python",
            description: "An excellent tutorial for getting started with Pandas."
          },
          {
            id: 3,
            title: "Kaggle - Pandas Practice",
            link: "https://www.kaggle.com/learn/pandas",
            description: "Kaggle's free course to practice and learn Pandas."
          },
          {
            id: 4,
            title: "Real Python - Pandas",
            link: "https://realpython.com/pandas-python-explore-dataset/",
            description: "In-depth guide to exploring datasets using Pandas on Real Python."
          }
        ]
      },
      {
        id: 3,
        topic: "Machine Learning",
        resources: [
          {
            id: 1,
            title: "Coursera - Machine Learning by Andrew Ng",
            link: "https://www.coursera.org/learn/machine-learning",
            description: "A popular course on machine learning by Andrew Ng, covering algorithms and techniques."
          },
          {
            id: 2,
            title: "Kaggle - Machine Learning Courses",
            link: "https://www.kaggle.com/learn/overview",
            description: "Kaggle offers a variety of free courses on machine learning."
          },
          {
            id: 3,
            title: "Fast.ai - Practical Deep Learning for Coders",
            link: "https://course.fast.ai/",
            description: "A free course focusing on deep learning with a practical approach."
          },
          {
            id: 4,
            title: "Udacity - Intro to Machine Learning",
            link: "https://www.udacity.com/course/intro-to-machine-learning-with-pytorch--ud188",
            description: "Introductory course to machine learning using Python and PyTorch."
          },
          {
            id: 5,
            title: "DataCamp - Introduction to Deep Learning with Keras",
            link: "https://www.datacamp.com/courses/deep-learning-in-python",
            description: "A beginner-friendly course to understand deep learning using the Keras library."
          }
        ]
      },
      {
        id: 4,
        topic: "Web Development",
        resources: [
          {
            id: 1,
            title: "freeCodeCamp - Responsive Web Design Certification",
            link: "https://www.freecodecamp.org/learn/responsive-web-design/",
            description: "Learn how to build responsive websites with HTML, CSS, and JavaScript."
          },
          {
            id: 2,
            title: "The Odin Project - Full Stack JavaScript",
            link: "https://www.theodinproject.com/paths/full-stack-javascript",
            description: "A full-stack JavaScript curriculum with projects to build."
          },
          {
            id: 3,
            title: "Codecademy - Full-Stack Engineer",
            link: "https://www.codecademy.com/learn/paths/full-stack-engineer-career-path",
            description: "A comprehensive career path in web development covering both front-end and back-end."
          },
          {
            id: 4,
            title: "MDN Web Docs - HTML, CSS, JavaScript",
            link: "https://developer.mozilla.org/en-US/docs/Web/Guide",
            description: "The Mozilla Developer Network offers free tutorials on HTML, CSS, and JavaScript."
          },
          {
            id: 5,
            title: "Udemy - The Complete Web Developer Bootcamp",
            link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
            description: "An all-in-one course for mastering web development with HTML, CSS, JS, Node.js, and more."
          }
        ]
      },
      {
        id: 5,
        topic: "Data Science",
        resources: [
          {
            id: 1,
            title: "Coursera - Data Science Specialization by Johns Hopkins University",
            link: "https://www.coursera.org/specializations/jhu-data-science",
            description: "A comprehensive Data Science specialization offered by Johns Hopkins University."
          },
          {
            id: 2,
            title: "Kaggle - Python and Data Science Tutorials",
            link: "https://www.kaggle.com/learn/overview",
            description: "Free courses on Python and Data Science on Kaggle."
          },
          {
            id: 3,
            title: "DataCamp - Introduction to Data Science in Python",
            link: "https://www.datacamp.com/courses/intro-to-data-science-in-python",
            description: "A beginner-friendly course that covers the basics of data science using Python."
          },
          {
            id: 4,
            title: "Udacity - Data Analyst Nanodegree",
            link: "https://www.udacity.com/course/data-analyst-nanodegree--nd002",
            description: "A full-fledged course focused on data analysis techniques and tools."
          },
          {
            id: 5,
            title: "edX - Data Science MicroMasters Program",
            link: "https://www.edx.org/micromasters/uc-san-diegos-data-science-program",
            description: "An advanced Data Science program that offers practical applications of data analysis techniques."
          }
        ]
      },
      // Add more topics and resources as needed
    ];
  
    return (
      <div className="learning-resources-container">
        {learningResources.map(resourceTopic => (
          <div key={resourceTopic.id} className="resource-topic-card">
            <h2>{resourceTopic.topic}</h2>
            <ul className="resources-list">
              {resourceTopic.resources.map(resource => (
                <li key={resource.id} className="resource-item">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                    <h3>{resource.title}</h3>
                  </a>
                  <p>{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default LearningResources;