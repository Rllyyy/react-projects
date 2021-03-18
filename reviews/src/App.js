import React, {useState} from "react";
import Review from "./Review";
import people from "./data";
import './App.css';

function App() {
  const [index, setIndex] = useState(0);
  const {id, name, job, image, text} = people[index];
  return (
    <React.Fragment>
      <section>
        <h2>What Our Customers Say</h2>
        <div className="underline"></div>
        <Review key={id} name={name} job={job} image={image} text={text}/>
      </section>
    </React.Fragment>
  );
}

export default App;
