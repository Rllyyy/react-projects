import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/DataContext.js";

function Home() {
  //useContext
  const data = useContext(DataContext);
  return (
    <main className='home'>
      <h1 className='home-heading'>Categories</h1>
      <section className='home-content'>
        {data.map((item) => {
          const { id, category, backgroundURL, info } = item;
          return (
            <div className='category' key={id}>
              <Link to={`/${category}`}>
                <img src={backgroundURL} alt={`${category}-pic`} />
                <div className='category-info'>
                  <div className='category-title'>
                    <h2>{category}</h2>
                    <p className='category-text'>{info}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Home;
