import React from "react";
import Review from "./Review";
import people from "./data";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <section>
        <h2>What Our Customers Say</h2>
        <div className="underline"></div>
        <Review people={people}/>
      </section>
    </React.Fragment>
  );
}

export default App;
