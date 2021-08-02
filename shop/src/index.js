/* Imports */

//Import React stuff
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//CSS
import "./index.css";

//Context
import { DataProvider } from "./DataContext.js";

//Components
import Home from "./Components/Home.js";
import Cart from "./Components/Cart.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import Phones from "./Components/Phones.js";
import Laptops from "./Components/Laptops.js";
import Smartwatches from "./Components/Smartwatches.js";
import Tablets from "./Components/Tablets";
import Headphones from "./Components/Headphones";
import reportWebVitals from "./reportWebVitals";

/* React Render */
ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <DataContext.Provider value={data}> */}
      <DataProvider>
        <Header />
        <Switch>
          {/* TODO Instead of every Route make it with one and id?? */}
          <Route path='/' exact component={Home} />
          <Route path='/phones' exact component={Phones} />
          <Route path='/laptops' exact component={Laptops} />
          <Route path='/smartwatches' exact component={Smartwatches} />
          <Route path='/tablets' exact component={Tablets} />
          <Route path='/headphones' exact component={Headphones} />
          <Route path='/cart' exact component={Cart} />
        </Switch>
      </DataProvider>
      {/* </DataContext.Provider> */}
    </Router>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
