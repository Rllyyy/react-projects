import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";

const Header = () => {
  return (
    <nav>
      <Link to='/' className='home-link-header'>
        <h3>Logo</h3>
      </Link>
      <div className='main-links'>
        <Link to='/' className='home-link-header'>
          <h3>Home</h3>
        </Link>
        <Link to='/phones' className='phones-link-header'>
          <h3>Phones</h3>
        </Link>
        <Link to='/laptops' className='laptops-link-header'>
          <h3>Laptops</h3>
        </Link>
        <Link to='/smartwatches' className='smartwatches-link-header'>
          <h3>Smartwatches</h3>
        </Link>
        <Link to='/tablets' className='tablets-link-header'>
          <h3>Tablets</h3>
        </Link>
        <Link to='/headphones' className='headphones-link-header'>
          <h3>Headphones</h3>
        </Link>
      </div>
      <Link to='/cart' className='cart-link-header'>
        <RiShoppingCartFill />
      </Link>
    </nav>
  );
};

export default Header;
