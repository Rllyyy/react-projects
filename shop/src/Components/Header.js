import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { DataContext } from "../Context/DataContext.js";
import { CartContext } from "../Context/CartContext.js";

const Header = () => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [itemCount, setItemCount] = useState(0);
  //useContext
  const data = useContext(DataContext);
  const { state } = useContext(CartContext);

  //Calculate total amount of items in cart including the quantity
  const calc = useCallback(() => {
    let cartAmount = 0;
    state.cartList.forEach((item) => {
      cartAmount = cartAmount + item.quantity;
    });
    setItemCount(cartAmount);
  }, [state.cartList]);

  //Update display of how many items are in cart (in the heading)
  useEffect(() => {
    calc();
  }, [state.cartList, calc]);

  //detect urlChange
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;

    //remove dash
    let pathNoDash = currentPath.substring(1);

    //No need to capitalize the path because it isn't capitalized in the original Data (instead capitalized by css)
    setCurrentCategory(pathNoDash);
  }, [location.pathname]);

  //Set the font in the header to purple if the user is currently viewing this category
  const isCurrentCategoryView = useCallback(
    (category) => {
      if (currentCategory === category) {
        return true;
      }
      return false;
    },
    [currentCategory]
  );

  //Set the font in the header to purple if the user is currently viewing the homepage
  const isHomepageView = useCallback(() => {
    if (currentCategory === "") return true;
    return false;
  }, [currentCategory]);

  return (
    <nav>
      <Link to='/' className='home-link-header'>
        <h3>Logo</h3>
      </Link>
      <div className='main-links'>
        <Link to='/' className='home-link-header' style={{ color: isHomepageView() ? "rgb(71, 8, 189)" : "black" }}>
          <h3>Home</h3>
        </Link>
        {data.map((item) => {
          const { id, category } = item;
          return (
            <Link to={`/${category}`} className='phones-link-header' key={id}>
              <h3 className={`${isCurrentCategoryView(category) ? "categorySelected" : null}`}>{category}</h3>
            </Link>
          );
        })}
      </div>
      <Link to='/cart' className='cart-link-header'>
        <RiShoppingCartFill />
        {itemCount > 0 && (
          <div className='cart-amount'>
            <p>{itemCount}</p>
          </div>
        )}
      </Link>
    </nav>
  );
};

export default Header;
