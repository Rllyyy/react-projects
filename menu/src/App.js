import React, {useState} from "react";
import './App.css';
import Menu from "./Menu";
import Categories from "./Categories";
import data from "./data.js";

function App() {
  const [menuItems, setMenuItems] = useState(data);
  const [categories, setCategories] = useState([]);
  return (
    <>
      <h2 className="title">Our Menu</h2>
      <div className="underline"></div>
      <Categories />
      <Menu data={menuItems}/>
    </>
  );
}

export default App;
