import React, { useState, useEffect, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

//Style for Custom slider
//https://codesandbox.io/s/h0esn?file=/demo.js:4005-4014
const PriceSlider = withStyles({
  root: {
    // color: "rgb(176, 116, 255);",
    color: "rgb(136, 80, 240);",
    height: 3,
    padding: "0px 0",
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
    color: "rgb(191, 154, 250);",
  },
  rail: {
    color: "rgb(179, 177, 177);",
    opacity: 1,
    height: 3,
  },
})(Slider);

//Style for Custom Checkbox
const ManufacturerCheckbox = withStyles({
  root: {
    color: "rgb(136, 80, 240)",
    height: "35px",
    width: "35px",
    "&$checked": {
      color: "rgb(136, 80, 240)",
    },
  },
  checked: {},
})(Checkbox);

const Filter = ({ originalData, sortFunction }) => {
  const [value, setValue] = useState([0, 100]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [manufacturers, setManufacturers] = useState([{}]);

  //get all prices and return highest one. Increment by 1 to include items with .99€
  const getMaxPrice = useCallback(() => {
    let itemsPrice = originalData.map((element) => {
      return parseInt(element.price);
    });
    return Math.max(...itemsPrice) + 1;
  }, [originalData]);

  //!Split this useEffect
  useEffect(() => {
    //get array,
    //TODO map this
    const noUniqueManufacturers = [];
    originalData.forEach((item) => {
      noUniqueManufacturers.push(item.manufacturer);
    });

    //Create unique set
    let uniqueManufacturers = Array.from(new Set(noUniqueManufacturers));

    //Sort manufacturer array alphabetically
    uniqueManufacturers.sort((a, b) => a.localeCompare(b));

    //TODO map this
    let items = [];
    uniqueManufacturers.forEach((item) => {
      items.push({ manufacturer: item, isChecked: true });
    });

    setManufacturers(items);
  }, [originalData]);

  //
  useEffect(() => {
    if (!isFinite(getMaxPrice())) return;
    setMaxPrice(getMaxPrice());
    setValue((initial) => [initial[0], getMaxPrice()]);
  }, [originalData, getMaxPrice]);

  //
  const newArray = (values) => {
    //Get the min/max values from the array
    const minValue = values[0];
    const maxValue = values[1];

    //TODO map this
    let updatedArray = [];
    originalData.forEach((item) => {
      //Guards i.e. negatives of what someone wants
      if (item.price < minValue || item.price > maxValue) return;
      if (!manufacturers.find((x) => x.manufacturer === item.manufacturer).isChecked) return;

      //Update the array if none of the guards are activated
      updatedArray.push(item);
    });
    //console.log(sortFunction);
    sortFunction(updatedArray);
  };

  //Event Handlers
  //OnSubmit create a new output array that match the items in the filter
  const handleSubmit = (e) => {
    e.preventDefault();
    //return elements in price array
    newArray(value);
  };

  //OnChange update the range of the price slider
  const handleChange = (e, newValue) => {
    e.preventDefault();

    if (isNaN(newValue[0]) || isNaN(newValue[1])) {
      setValue([0, 50]);
      return;
    }

    setValue(newValue);
  };

  //OnChange change the state of the checkbox
  const handleCheckBoxChange = (e) => {
    //Get the index of the manufacturer. Value is the index
    const manufacturerIndex = e.target.attributes.value.value;
    //Spread the array and only change the relevant isChecked
    setManufacturers([...manufacturers], (manufacturers[manufacturerIndex].isChecked = e.target.checked));
  };

  const handleMinPriceChange = (e) => {
    setValue([parseFloat(e.target.value), value[1]]);
  };

  const handleMaxPriceChange = (e) => {
    let maxValue = parseFloat(e.target.value);
    setValue([value[0], maxValue]);
  };

  return (
    <form onSubmit={handleSubmit} className='filter'>
      <h3>Filter Products</h3>
      <div className='filter-content'>
        <div className='price-wrapper'>
          <p className='filter-category-heading'>Price</p>
          <div className='priceSlider-container'>
            <PriceSlider className='slider' value={value} onChange={handleChange} valueLabelDisplay='off' max={maxPrice} min={0} />
          </div>
          <div className='min-max-input-container'>
            <div className='min-container'>
              <input className='min-input' type='number' value={value[0].toString()} onChange={(e) => handleMinPriceChange(e)} max={maxPrice} min={0} required />
            </div>
            <div className='min-max-divide'>-</div>
            <div className='max-container'>
              <input className='max-input' type='number' value={value[1].toString() || ""} onChange={(e) => handleMaxPriceChange(e)} max={maxPrice} min={0} required />
            </div>
          </div>
        </div>
        <div className='manufacturers-wrapper'>
          <p className='filter-category-heading'>Manufacturers</p>
          {manufacturers.map((manufacturersObject, index) => {
            return (
              <div className='manufacturer-checkbox' key={`${manufacturersObject.manufacturer}-${index}`}>
                <FormControlLabel
                  control={<ManufacturerCheckbox onChange={(e) => handleCheckBoxChange(e)} value={index} checked={manufacturersObject.isChecked} />}
                  label={manufacturersObject.manufacturer}
                />
              </div>
            );
          })}
        </div>
      </div>
      <button type='submit' className='filter-button'>
        Filter
      </button>
    </form>
  );
};

export default Filter;
