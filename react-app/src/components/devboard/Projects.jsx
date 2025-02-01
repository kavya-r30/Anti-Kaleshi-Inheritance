import React, { useState, useEffect, useMemo } from 'react';
import { Star, GitFork, Tag, ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`relative backdrop-blur-sm rounded-2xl p-6 transition-all duration-500
        group bg-gradient-to-br from-white/40 via-white/60 to-white/30 ease-out shadow-lg
        border border-white/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={{
        animation: `fadeIn ${index * 0.1}s backwards`, transitionDelay: `${index * 150}ms`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl 
        transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      
      <div className="relative space-y-4 z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Github className="w-5 h-5 transition-all duration-300 hover:text-blue-600 text-gray-600" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              {project.name}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full
              bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100/50">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-700 font-semibold">{project.stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full
              bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50">
              <GitFork className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-700 font-semibold">{project.forks.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm h-12 line-clamp-2 leading-6 font-medium">
          {project.desc || 'No description available'}
        </p>
        
        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {project.topics.slice(0, 4).map((topic, index) => (
           <div key={index}
            className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-100 
                    to-gray-50 text-gray-700 text-xs font-medium border border-white/50"
            >
              <Tag className='w-3 h-3 mr-1 transition-colors duration-300 hover:text-blue-500 text-gray-400' />
              {topic}
            </div>
          ))}
        </div>
        
        <a href={project.url} target="_blank"
          rel="noopener noreferrer" className="block w-full mt-6"
        >
          <button className="w-full py-3 px-4 rounded-xl transition-all duration-500 
            space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium 
            shadow-lg hover:shadow-blue-500/30 flex items-center justify-center">
            <span>View Repository</span>
            <ExternalLink className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1`} />
          </button>
        </a>
      </div>
    </div>
  );
};

const Projects = (githubData) => {
  const data = useMemo(() => githubData.githubData, [githubData]);
  const repositories = data?.repositories?.topRepos || [];

  return (
    <div className="w-full">
        <div className="grid grid-cols-3 gap-8">
            {repositories.slice(0, 6).map((repo, index) => (
            <ProjectCard 
                key={index} 
                project={repo} 
                index={index}
            />
            ))}
        </div>
    </div>
  );
};

export default Projects;
