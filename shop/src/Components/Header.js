import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";

const Header = () => {
  return (
    <nav>
      <ul>
        <Link to='/'>
          <li>
            <h3>Logo</h3>
          </li>
        </Link>
        <Link to='/'>
          <li>
            <h3>Home</h3>
          </li>
        </Link>
        <Link to='/cart'>
          <li className='shopping-cart'>
            <RiShoppingCartFill />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
