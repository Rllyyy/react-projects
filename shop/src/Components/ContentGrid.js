import React, { useState, useEffect, useContext, useCallback } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Filter from "../Components/Filter.js";
import { DataContext } from "../Context/DataContext.js";
import { CartContext } from "../Context/CartContext.js";

const ContentGrid = ({ type }) => {
  //useStates
  const [originalData, setOriginalData] = useState([]);
  const [outputItems, setOutputItems] = useState([]);
  const [currentSortMethod, setCurrentSortMethod] = useState("default");

  //useContext
  const importData = useContext(DataContext);
  const cartData = useContext(CartContext);

  //useEffect
  useEffect(() => {
    let category = importData.filter((item) => item.category === type);
    try {
      setOutputItems(category[0].items);
      //sortFunction(category[0].items, originalData);
      setOriginalData(category[0].items);
    } catch {}
  }, [type, importData]);
  //TODO useCallback for above

  //functions
  //TODO MEMO/Callback this
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

  const addItemToCart = (item) => {
    cartData.dispatch({ type: "ADD_ITEM_TO_CART", payload: { item } });
  };

  const handleChange = (e) => {
    setCurrentSortMethod(e.target.value);
  };

  //function to sort output array by either price, alphabet or releaseDate
  const sortFunction = useCallback(
    (importArray) => {
      let dataArray = [...importArray];
      switch (currentSortMethod) {
        case "default":
          //only update the outputItems if the length of the given array is bigger than 0 to prevent empty output
          if (dataArray.length > 0) {
            setOutputItems(dataArray);
          }
          break;
        case "price-low-to-high":
          setOutputItems(dataArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
          break;
        case "price-high-to-low":
          setOutputItems(dataArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
          break;
        case "alphabet-a-to-z":
          setOutputItems(dataArray.sort((a, b) => a.productName.localeCompare(b.productName)));
          break;
        case "alphabet-z-to-a":
          setOutputItems(dataArray.sort((a, b) => a.productName.localeCompare(b.productName)).reverse());
          break;
        case "release-new-to-old":
          //Dates are in ISO Format (YYYY-MM-DD)
          setOutputItems(dataArray.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)));
          break;
        case "release-old-to-new":
          //Dates are in ISO Format (YYYY-MM-DD)
          setOutputItems(dataArray.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)));
          break;
        default:
          throw new Error("No matching sorting type");
      }
    },
    [currentSortMethod]
  );

  useEffect(() => {
    if (currentSortMethod === "default") {
      sortFunction(originalData);
    } else {
      sortFunction(outputItems);
    }
  }, [currentSortMethod, sortFunction, originalData]);

  /* useEffect(() => {
    console.log(outputItems);
  }, [outputItems]); */

  return (
    <main className='content-grid'>
      <div className='heading-sort-wrapper'>
        {/* <div className='empty'>hello</div> */}
        <h2>{type}</h2>
        <div className='label-sort-wrapper'>
          <label htmlFor='sort'>Sort by: </label>
          <select id='sort' onChange={(e) => handleChange(e)}>
            <option value='default'>Default</option>
            <option value='price-low-to-high'>Price: Low to High</option>
            <option value='price-high-to-low'>Price: High to Low</option>
            <option value='alphabet-a-to-z'>Alphabet: A to Z</option>
            <option value='alphabet-z-to-a'>Alphabet: Z to A</option>
            <option value='release-new-to-old'>Release: New to Old</option>
            <option value='release-old-to-new'>Release: Old to New</option>
          </select>
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
