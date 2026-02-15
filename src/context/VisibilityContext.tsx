import { createContext, useContext, useState, type ReactNode } from 'react';

interface VisibilityContextType {
  showClock: boolean;
  showBookmarks: boolean;
  showSearch: boolean;
  showTodo: boolean;
  toggleClock: () => void;
  toggleBookmarks: () => void;
  toggleSearch: () => void;
  toggleTodo: () => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export function VisibilityProvider({ children }: { children: ReactNode }) {
  const [showClock, setShowClock] = useState(() => {
    const saved = localStorage.getItem('showClock');
    return saved ? saved === 'true' : true;
  });

  const [showBookmarks, setShowBookmarks] = useState(() => {
    const saved = localStorage.getItem('showBookmarks');
    return saved ? saved === 'true' : true;
  });

  const [showSearch, setShowSearch] = useState(() => {
    const saved = localStorage.getItem('showSearch');
    return saved ? saved === 'true' : true;
  });

  const [showTodo, setShowTodo] = useState(() => {
    const saved = localStorage.getItem('showTodo');
    return saved ? saved === 'true' : true;
  });

  const toggleClock = () => {
    setShowClock((prev) => {
      const newValue = !prev;
      localStorage.setItem('showClock', newValue.toString());
      return newValue;
    });
  };

  const toggleBookmarks = () => {
    setShowBookmarks((prev) => {
      const newValue = !prev;
      localStorage.setItem('showBookmarks', newValue.toString());
      return newValue;
    });
  };

  const toggleSearch = () => {
    setShowSearch((prev) => {
      const newValue = !prev;
      localStorage.setItem('showSearch', newValue.toString());
      return newValue;
    });
  };

  const toggleTodo = () => {
    setShowTodo((prev) => {
      const newValue = !prev;
      localStorage.setItem('showTodo', newValue.toString());
      return newValue;
    });
  };

  return (
    <VisibilityContext.Provider
      value={{
        showClock,
        showBookmarks,
        showSearch,
        showTodo,
        toggleClock,
        toggleBookmarks,
        toggleSearch,
        toggleTodo,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
}
