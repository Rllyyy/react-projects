import React, { useState, useEffect } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { data } from "../data.js";
import Filter from "../Components/Filter.js";

const ContentGrid = ({ type }) => {
  const [originalData, setOriginalData] = useState([]);
  const [outputItems, setOutputItems] = useState([]);

  //TODO useCallback
  useEffect(() => {
    let category = data.filter((item) => item.category === type);
    try {
      setOutputItems(category[0].items);
      setOriginalData(category[0].items);
    } catch { }
  }, [type]);

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

  return (
    <main>
      <h2>{type}</h2>{" "}
      <div className='filter-content-wrapper'>
        <Filter originalData={originalData} setOutputItems={setOutputItems} />
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
                  <p className='product-name'>{productName}</p>
                  <p className='product-price'>{price}€</p>
                  <button className='button-to-cart'>Add to Cart</button>
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
