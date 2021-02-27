import React, {useState, useEffect} from "react";
import './App.css';
import Tours from "./tours";
import Loading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const apiUrl = "https://course-api.com/react-tours-project";

  const removeTourFunction = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours);
  }

  const fetchTours = async () => {
    try {
      const response = await fetch(apiUrl);
      const tours = await response.json();
      setLoading(false);
      setTours(tours)
    }catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchTours();
  }, []);

  if (loading) {
    return (
      <>
        <Loading/>
      </>
    );
  }

  if(tours.length === 0) {
    return (
      <>
        <section>
          <h2>No Tours Left</h2>
          <div className="underline"></div>
          <button className="button" onClick={()=>fetchTours()}>Show Tours</button>
        </section>
      </>
    );
  }


  //default return if both if statements are false
  return (
    <React.Fragment>
      <section>
        <h2>Our Tours</h2>
        <div className="underline"></div>
        {tours.map((tour)=>{
          return <Tours key={tour.id} {...tour} removeTourProp={removeTourFunction}/>
        })}
      </section>
    </React.Fragment>
  );
}

export default App;
