import React, { useState, useEffect } from 'react';
import styles from './Background.module.scss';


const Background: React.FC = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generatePath = (width: number) => {
    width = width - 2;
    const height = 68 * viewportWidth / 2560;
    const topRadius = 30 * viewportWidth / 2560;
    const bottomRadius = 16 * viewportWidth / 2560;

    return (
        <svg className={styles.background} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d={`M 0 ${topRadius} 
            Q 0 0 ${topRadius} 0 
            L ${width - topRadius} 0 
            Q ${width} 0 ${width} ${topRadius} 
            L ${width} ${height} 
            Q ${width} ${height - bottomRadius} ${width - bottomRadius} ${height - bottomRadius} 
            L ${bottomRadius} ${height - bottomRadius} 
            Q 0 ${height - bottomRadius} 0 ${height}`} />
        </svg>
    )
  };

  return generatePath(viewportWidth)
};

export default Background;