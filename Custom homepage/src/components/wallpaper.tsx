import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import gokuWallpaper from '/wallpapers/goku.jpg';
import spiderNoirWallpaper from '/wallpapers/spider-noir.jpg';

function Wallpaper() {

  const wallpaper = [
    { name: 'goku', path: gokuWallpaper },
    { name: 'spider_noir', path: spiderNoirWallpaper }
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  // Apply wallpaper to body when currentIndex changes and on mount
  useEffect(() => {
    document.body.style.backgroundImage = `url(${wallpaper[currentIndex].path})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundColor = '#1a1a1a'; // Fallback color
  }, [currentIndex]);

  // Handle right arrow click - next wallpaper
  const handleNextWallpaper = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wallpaper.length);
  };

  // Handle left arrow click - previous wallpaper
  const handlePreviousWallpaper = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? wallpaper.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container" style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
      <i className="bi bi-arrow-left-short" onClick={handlePreviousWallpaper} style={{ cursor: 'pointer', display: 'inline-block' }}></i>
      <p style={{ margin: '0 10px', color: 'white' }}>{wallpaper[currentIndex].name}</p>
      <i className="bi bi-arrow-right-short" onClick={handleNextWallpaper} style={{ cursor: 'pointer', display: 'inline-block' }}></i>
    </div>
  );
}

export default Wallpaper;