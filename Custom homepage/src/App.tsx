import "./styles/app.css"
import Clock from "./components/clock"; 
import Settings from "./components/settings";
import { TimeFormatProvider } from "./context/TimeFormatContext";

function App() {
  return (
    <TimeFormatProvider>
      <div className="App">
        <Clock />
        <Settings />
      </div>
    </TimeFormatProvider>
  )
}

export default App