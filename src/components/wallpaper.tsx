import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import gokuWallpaper from '/wallpapers/goku.jpg';
import spiderNoirWallpaper from '/wallpapers/spider-noir.jpg';
import japanWallpaper from '/wallpapers/japan.jpg';
import car from '/wallpapers/car.jpg';

const wallpapers = [
  { name: 'goku', path: gokuWallpaper },
  { name: 'spider_noir', path: spiderNoirWallpaper },
  { name: 'japan', path: japanWallpaper },
  { name: 'car', path: car }
];

function Wallpaper() {

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('selectedWallpaper');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    document.body.style.backgroundImage = `url(${wallpapers[currentIndex].path})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    localStorage.setItem('selectedWallpaper', currentIndex.toString());
  }, [currentIndex]);

  const handleNextWallpaper = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wallpapers.length);
  };

  const handlePreviousWallpaper = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? wallpapers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container" style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
      <i className="bi bi-arrow-left-short" onClick={handlePreviousWallpaper} style={{ cursor: 'pointer', display: 'inline-block' }}></i>
      <p style={{ margin: '0 10px' }}>{wallpapers[currentIndex].name}</p>
      <i className="bi bi-arrow-right-short" onClick={handleNextWallpaper} style={{ cursor: 'pointer', display: 'inline-block' }}></i>
    </div>
  );
}

export default Wallpaper;