import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { DataContext } from "../Context/DataContext.js";
import { CartContext } from "../Context/CartContext.js";

const fromLocal = JSON.parse(localStorage.getItem("cart-items"));

const Header = () => {
  //useContext
  const data = useContext(DataContext);
  //const cartData = useContext(CartContext);

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
        <div className='cart-amount'>
          <p>0</p>
        </div>
      </Link>
    </nav>
  );
};

export default Header;
