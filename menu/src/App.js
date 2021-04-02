import React, {useState} from "react";
import './App.css';
import Menu from "./Menu";
import Categories from "./Categories";
import data from "./data.js";

//Set for unique values in array instead of every item in the array
const allCategories = ["all", ...new Set (data.map((item)=>item.category))] ;

function App() {
  const [menuItems, setMenuItems] = useState(data);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(data);
      return;
    }

    const newData = data.filter((item) => item.category === category);
    setMenuItems(newData);
  }
  return (
    <>
      <h2 className="title">Our Menu</h2>
      <div className="underline"></div>
      <Categories categories={categories} filterItems={filterItems}/>
      <Menu data={menuItems}/>
    </>
  );
}

export default App;
