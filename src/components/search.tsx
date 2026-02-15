import { useState } from 'react';
import { FaGoogle, FaYahoo } from 'react-icons/fa';
import { SiDuckduckgo, SiBrave } from 'react-icons/si';
import { IoSearch } from 'react-icons/io5';
import styles from '../styles/search.module.css';

interface SearchEngine {
  name: string;
  url: string;
  icon: JSX.Element;
}

function Search() {
  const searchEngines: SearchEngine[] = [
    {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: <FaGoogle />
    },
    {
      name: 'DuckDuckGo',
      url: 'https://duckduckgo.com/?q=',
      icon: <SiDuckduckgo />
    },
    {
      name: 'Yahoo',
      url: 'https://search.yahoo.com/search?p=',
      icon: <FaYahoo />
    },
    {
      name: 'Brave',
      url: 'https://search.brave.com/search?q=',
      icon: <SiBrave />
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngineIndex, setSelectedEngineIndex] = useState<number>(() => {
    const saved = localStorage.getItem('searchEngine');
    if (saved) {
      const index = parseInt(saved, 10);
      return index >= 0 && index < searchEngines.length ? index : 0;
    }
    return 0;
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const engine = searchEngines[selectedEngineIndex];
      const searchUrl = engine.url + encodeURIComponent(searchQuery);
      window.open(searchUrl, '_blank');
      setSearchQuery('');
    }
  };

  const cycleEngine = () => {
    const newIndex = (selectedEngineIndex + 1) % searchEngines.length;
    setSelectedEngineIndex(newIndex);
    localStorage.setItem('searchEngine', newIndex.toString());
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <button 
          type="button"
          onClick={cycleEngine}
          className={styles.engineButton}
          title={searchEngines[selectedEngineIndex].name}
        >
          {searchEngines[selectedEngineIndex].icon}
        </button>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <IoSearch />
        </button>
      </form>
    </div>
  );
}

export default Search;