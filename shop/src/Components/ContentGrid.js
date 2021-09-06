import React, { useState, useEffect, useContext, useCallback } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Filter from "../Components/Filter.js";
import { DataContext } from "../Context/DataContext.js";
import { CartContext } from "../Context/CartContext.js";
import { RiArrowDropDownLine } from "react-icons/ri";

const ContentGrid = ({ type }) => {
  //useStates
  const [originalData, setOriginalData] = useState([]);
  const [outputItems, setOutputItems] = useState([]);
  const [currentSortMethod, setCurrentSortMethod] = useState("Default Sort");
  const [showDropdown, setShowDropdown] = useState(false);

  //useContext
  const importData = useContext(DataContext);
  const cartData = useContext(CartContext);

  //functions
  //TODO MEMO this
  const applyImgFix = () => {
    switch (type) {
      case "laptops":
        return "laptop-tablet-headphone-fix-img";
      case "tablets":
        return "laptop-tablet-headphone-fix-img";
      case "headphones":
        return "laptop-tablet-headphone-fix-img";
      default:
        return "no-img-fix";
    }
  };

  const handleDropdownClick = (e) => {
    setCurrentSortMethod(e.target.innerText);
    setShowDropdown(false);
  };

  //function to sort output array by either price, alphabet or release Date
  const sortFunction = useCallback(
    (importArray) => {
      let dataArray = [...importArray];
      switch (currentSortMethod) {
        case "Default Sort":
          setOutputItems(dataArray.sort((a, b) => a.id.localeCompare(b.id)));
          break;
        case "Price: Low to High":
          setOutputItems(dataArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
          break;
        case "Price: High to Low":
          setOutputItems(dataArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
          break;
        case "Alphabet: A to Z":
          setOutputItems(dataArray.sort((a, b) => a.productName.localeCompare(b.productName)));
          break;
        case "Alphabet: Z to A":
          setOutputItems(dataArray.sort((a, b) => a.productName.localeCompare(b.productName)).reverse());
          break;
        case "Release: New to Old":
          //Dates are in ISO Format (YYYY-MM-DD)
          setOutputItems(dataArray.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)));
          break;
        case "Release: Old to New":
          //Dates are in ISO Format (YYYY-MM-DD)
          setOutputItems(dataArray.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)));
          break;
        default:
          throw new Error("No matching sorting type");
      }
    },
    [currentSortMethod]
  );

  //Hide the dropdown quantity on the next click.
  //Should this be outside of the return??
  const hideDropDownOnNextClick = useCallback(
    (e) => {
      if (showDropdown === false) {
        return;
      }

      //dropdown items and the arrow are excluded because they are already handled
      if (
        e.target.className !== "dropdown-list-item" &&
        e.target.className !== "selected-current-sort" &&
        e.target.className.baseVal !== "dropdown-arrow dropdown-arrow-extended" &&
        e.target.className.baseVal !== ""
      ) {
        setShowDropdown(false);
      }
    },
    [showDropdown]
  );

  //Dispatch
  const addItemToCart = (item) => {
    cartData.dispatch({ type: "ADD_ITEM_TO_CART", payload: { item } });
  };

  //useEffects
  useEffect(() => {
    if (outputItems.length === 0) return;
    if (currentSortMethod.length === 0) return;
    sortFunction([...outputItems]);
  }, [currentSortMethod, sortFunction, originalData]);

  useEffect(() => {
    let category = importData.filter((item) => item.category === type);
    try {
      setOutputItems(category[0].items);
      setOriginalData(category[0].items);
    } catch {}
  }, [type, importData]);

  //close Dropdown
  useEffect(() => {
    //add eventListener for next click
    window.addEventListener("mousedown", hideDropDownOnNextClick);
    return () => {
      window.removeEventListener("mousedown", hideDropDownOnNextClick);
    };
  }, [showDropdown, hideDropDownOnNextClick]);

  /*
  useEffect(() => {
    console.log(outputItems);
  }, [outputItems]);
*/

  return (
    <main className='content-grid'>
      <div className='heading-sort-wrapper'>
        <h2>{type}</h2>
        <div className='dropdown-wrapper'>
          <div className='selected-dropdown-wrapper'>
            <p className='selected-current-sort' onClick={() => setShowDropdown(!showDropdown)}>
              {currentSortMethod}
            </p>
            <button className='dropdown-arrow-button'>
              <RiArrowDropDownLine className={`dropdown-arrow ${showDropdown && "dropdown-arrow-extended"}`} onClick={() => setShowDropdown(!showDropdown)} />
            </button>
          </div>
          <ul className={`dropdown-list ${showDropdown && "li-extended"}`} onClick={handleDropdownClick}>
            <li className='dropdown-list-item'>Default Sort</li>
            <li className='dropdown-list-item'>Price: Low to High</li>
            <li className='dropdown-list-item'>Price: High to Low</li>
            <li className='dropdown-list-item'>Alphabet: A to Z</li>
            <li className='dropdown-list-item'>Alphabet: Z to A</li>
            <li className='dropdown-list-item'>Release: New to Old</li>
            <li className='dropdown-list-item'>Release: Old to New</li>
          </ul>
        </div>
      </div>
      <div className='filter-content-wrapper'>
        <Filter originalData={originalData} sortFunction={sortFunction} />
        <section className='content'>
          {outputItems.map((item) => {
            //destructure item
            const { id, productName, imageURL, price } = item;
            return (
              <div className='item' key={id}>
                <div className='product-more-info'>
                  <HiOutlinePlus />
                  <p>Learn More</p>
                </div>
                <div className='product-image'>
                  <img src={imageURL} alt={productName} className={applyImgFix()} />
                </div>
                <div className='info'>
                  <div className='price-name-wrapper'>
                    <p className='product-name'>{productName}</p>
                    <p>|</p>
                    <p className='product-price'>{price}€</p>
                  </div>
                  <button className='button-to-cart' onClick={() => addItemToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        {/* {outputItems.length === 0 && <h2>No Items found with the given parameters</h2>} */}
      </div>
    </main>
  );
};

export default ContentGrid;
