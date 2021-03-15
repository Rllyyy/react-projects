import React, {useState, useEffect} from "react";
import Review from "./Review";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <section>
        <h2>What Our Customers Say</h2>
        <div className="underline"></div>
        <Review/>
      </section>
    </React.Fragment>
  );
}

export default App;
