import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [selectedTech, setSelectedTech] = useState(null);

  const toggleTech = (techName) => {
    // If clicking the same tech, turn it off. Otherwise set it.
    setSelectedTech(prev => prev === techName ? null : techName);
    
    // Optional: Smooth scroll to projects section when filter is active
    if (techName) {
      const projectSection = document.getElementById('projects');
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <PortfolioContext.Provider value={{ selectedTech, toggleTech }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);