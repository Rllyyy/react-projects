import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
//import { data } from "../data.js";
import { DataContext } from "../DataContext.js";

const Header = () => {
  //useContext
  const data = useContext(DataContext);

  return (
    <nav>
      <Link to='/' className='home-link-header'>
        <h3>Logo</h3>
      </Link>
      <div className='main-links'>
        <Link to='/' className='home-link-header'>
          <h3>Home</h3>
        </Link>
        {data.map((item) => {
          const { id, category } = item;
          return (
            <Link to={`/${category}`} className='phones-link-header' key={id}>
              <h3>{category}</h3>
            </Link>
          );
        })}
      </div>

      <Link to='/cart' className='cart-link-header'>
        <RiShoppingCartFill />
      </Link>
    </nav>
  );
};

export default Header;
