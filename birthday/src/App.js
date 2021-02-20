import './App.css';
import React, {useState} from "react";
import data from "./data";
import List from "./List";

function App() {
  const [people, setPeople] = useState(data);

  const clearButton = () => {
    setPeople([]);
  }

  return (
    <>
      <div id="card">
        <h3>{people.length} Birthdays Today</h3>
        <div className="listContainer">
          <List people={people} />
        </div>
        <button id="btn" onClick={() => clearButton()}>Clear All</button>
      </div>
    </>
  );
}

export default App;
