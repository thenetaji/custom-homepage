import "./styles/app.css"
import Clock from "./components/clock"; 
import Settings from "./components/settings";
import { TimeFormatProvider } from "./context/TimeFormatContext";
import { VisibilityProvider, useVisibility } from "./context/VisibilityContext";
import Bookmarks from "./components/bookmark";
import Search from "./components/search";
import Todo from "./components/To-do";

function AppContent() {
  const { showClock, showBookmarks, showSearch, showTodo } = useVisibility();
  
  return (
    <div className="App">
      {showClock && <Clock />}
      <Settings />
      {showBookmarks && <Bookmarks />}
      {showSearch && <Search />}
      {showTodo && <Todo />}
    </div>
  );
}

function App() {
  return (
    <VisibilityProvider>
      <TimeFormatProvider>
        <AppContent />
      </TimeFormatProvider>
    </VisibilityProvider>
  )
}

export default App