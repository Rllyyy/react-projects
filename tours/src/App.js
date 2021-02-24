import React from "react";
import './App.css';
import Tours from "./tours";

function App() {
  return (
    <React.Fragment>
      <section>
        <h2>Our Tours</h2>
        <Tours />
        <Tours />
      </section>
    </React.Fragment>
  );
}

export default App;
