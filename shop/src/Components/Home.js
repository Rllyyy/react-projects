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

        {/* 
        <div className='category'>
          <Link to='/phones'>
            <img src='https://cdn11.bigcommerce.com/s-6dguysljed/product_images/uploaded_images/best-budget-phone-under-200.jpg' alt='' />
            <div className='category-info'>
              <div className='category-title'>
                <h2>Phones</h2>
                <p className='category-text'>Info</p>
              </div>
            </div>
          </Link>
        </div> */}
        {/*  
        <div className='category'>
          <Link to='/laptops'>
            <img src='https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_960_720.jpg' alt='' />
            <div className='category-info'>
              <div className='category-title'>
                <h2>Laptops</h2>
                <p className='category-text'>Info</p>
              </div>
            </div>
          </Link>
        </div>
        <div className='category'>
          <Link to='/smart-watches'>
            <img src='https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_960_720.jpg' alt='' />
            <div className='category-info'>
              <div className='category-title'>
                <h2>Smart Watches</h2>
                <p className='category-text'>Info</p>
              </div>
            </div>
          </Link>
        </div>
        <div className='category'>
          <Link to='/tablets'>
            <img src='https://cdn.pixabay.com/photo/2017/01/04/20/15/web-design-1953129_960_720.jpg' alt='' />
            <div className='category-info'>
              <div className='category-title'>
                <h2>Tablets</h2>
                <p className='category-text'>Info</p>
              </div>
            </div>
          </Link>
        </div>
        <div className='category'>
          <Link to='/headphones'>
            <img src='https://cdn.pixabay.com/photo/2018/01/16/10/18/headphone-3085681_960_720.jpg' alt='' />
            <div className='category-info'>
              <div className='category-title'>
                <h2>Headphones</h2>
                <p className='category-text'>Info</p>
              </div>
            </div>
          </Link>
        </div>
        */}
      </section>
    </main>
  );
}

export default Home;
