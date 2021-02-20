import logo from "./logo.svg";
import "./App.css";
import DiscourceGraph from "./components/discourceGraph";

function App() {
  return (
    <div className="App">
      <button>Discourse Thread</button>
      <button>Discourse Graph</button>
      <DiscourceGraph />
    </div>
  );
}

export default App;
