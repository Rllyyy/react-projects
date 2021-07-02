import React, { useState, useEffect } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import { data } from "../data.js";

//https://codesandbox.io/s/h0esn?file=/demo.js:4005-4014
const PriceSlider = withStyles({
  root: {
    color: "rgb(176, 116, 255);",
    height: 3,
    padding: "13px 0",
  },
  valueLabel: {
    left: "calc(0 + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
      fontSize: "14px",
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "rgb(231,231,231);",
    opacity: 1,
    height: 3,
  },
})(Slider);

const ContentGrid = ({ type }) => {
  const [originalData, setOriginalData] = useState([]);
  const [outputItems, setOutputItems] = useState([]);
  const [value, setValue] = useState([0, 100]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [manufacturers, setManufacturers] = useState([]);

  //TODO useCallback
  useEffect(() => {
    let category = data.filter((item) => item.category === type);
    try {
      setOutputItems(category[0].items);
      setOriginalData(category[0].items);
    } catch {}
  }, [type]);

  useEffect(() => {
    if (!isFinite(getMaxPrice())) return;
    setMaxPrice(getMaxPrice());
    setValue([value[0], getMaxPrice()]);
  }, [originalData]);

  useEffect(() => {
    //get array
    const noUniqueManufacturers = [];
    originalData.forEach((item) => {
      noUniqueManufacturers.push(item.manufacturer);
    });

    //Create unique set
    const uniqueManufacturers = Array.from(new Set(noUniqueManufacturers));
    setManufacturers(uniqueManufacturers);
  }, [originalData]);

  const getMaxPrice = () => {
    //get all prices and return highest one. Increment by 1 to include items with .99€
    let itemsPrice = [];
    originalData.forEach((element) => {
      let price = parseInt(element.price);
      itemsPrice.push(price);
    });
    return Math.max(...itemsPrice) + 1;
  };

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

  const newArray = (values) => {
    const minValue = values[0];
    const maxValue = values[1];

    let updatedArray = [];
    originalData.forEach((item) => {
      if (item.price >= minValue && item.price <= maxValue) {
        updatedArray.push(item);
      }
    });
    setOutputItems(updatedArray);
  };

  //Event Handlers
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newArray(value);
  };

  return (
    <main>
      <h2>{type}</h2>{" "}
      <div className='filter-content-wrapper'>
        <form onSubmit={handleSubmit} className='filter'>
          <h2>Filter Products</h2>
          <h3>Filter By Price</h3>
          <PriceSlider className='slider' value={value} onChange={handleChange} valueLabelDisplay='on' max={maxPrice} min={0} />
          <h3>Manufacturers</h3>
          {manufacturers.map((manufacturer) => {
            return <p key={manufacturer}>{manufacturer}</p>;
          })}
          <button type='submit'>Filter</button>
        </form>
        <section className='content'>
          {outputItems.map((item) => {
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
