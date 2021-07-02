import { Link } from "react-router-dom";
import { data } from "../data.js";

function Home() {
  return (
    <main className='Home'>
      <h2>Home Content</h2>
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
