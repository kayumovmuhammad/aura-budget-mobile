import React from 'react';
import './NoScrollbarContainer.css';

interface NoScrollbarContainerProps {
  children: React.ReactNode;
}

const NoScrollbarContainer: React.FC<NoScrollbarContainerProps> = ({ children }) => {
  return (
    <div className="no-scrollbar-container">
      {children}
    </div>
  );
};

export default NoScrollbarContainer;
