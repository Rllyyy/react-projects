import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { data } from "../data.js";

const ContentGrid = ({ type }) => {
  let category = data.filter((item) => item.category === type);
  let categoryItems;
  try {
    categoryItems = category[0].items;
  } catch {}

  return (
    <main>
      <h2>{type}</h2>
      <section className='content'>
        {categoryItems ? (
          categoryItems.map((item) => {
            const { id, productName, imageURL, price } = item;
            return (
              <div className='item' key={id}>
                <div className='product-more-info'>
                  <HiOutlinePlus />
                  <p>Learn More</p>
                </div>
                <div className='product-image'>
                  <img src={imageURL} alt='i-phone' className={type === "laptops" ? "laptop-img" : "phone-img"} />
                </div>
                <div className='info'>
                  <p className='product-name'>{productName}</p>
                  <p className='product-price'>{price}</p>
                  <button className='button-to-cart'>Add to Cart</button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No items defined</h2>
        )}
      </section>
    </main>
  );
};

export default ContentGrid;
