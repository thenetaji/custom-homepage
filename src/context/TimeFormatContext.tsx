import { createContext, useContext, useState, type ReactNode } from 'react';

interface TimeFormatContextType {
  is24Hour: boolean;
  toggleTimeFormat: () => void;
}

const TimeFormatContext = createContext<TimeFormatContextType | undefined>(undefined);

export function TimeFormatProvider({ children }: { children: ReactNode }) {
  const [is24Hour, setIs24Hour] = useState(() => {
    const saved = localStorage.getItem('timeFormat');
    return saved ? saved === '24' : true;
  });

  const toggleTimeFormat = () => {
    setIs24Hour((prev) => {
      const newValue = !prev;
      localStorage.setItem('timeFormat', newValue ? '24' : '12');
      return newValue;
    });
  };

  return (
    <TimeFormatContext.Provider value={{ is24Hour, toggleTimeFormat }}>
      {children}
    </TimeFormatContext.Provider>
  );
}

export function useTimeFormat() {
  const context = useContext(TimeFormatContext);
  if (context === undefined) {
    throw new Error('useTimeFormat must be used within a TimeFormatProvider');
  }
  return context;
}
