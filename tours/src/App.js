import React, {useState, useEffect} from "react";
import './App.css';
import Tours from "./tours";
import Loading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const apiUrl = "https://course-api.com/react-tours-project";

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

  return (
    <React.Fragment>
      <section>
        <h2>Our Tours</h2>
        <div className="underline"></div>
        {tours.map((tour)=>{
          return <Tours key={tour.id} {...tour}/>
        })}
      </section>
    </React.Fragment>
  );
}

export default App;
