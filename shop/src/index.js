/* Imports */

//Import React stuff
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

//CSS
import "./index.css";

//Context
import { DataProvider } from "./DataContext.js";

//Components
import Home from "./Components/Home.js";
import Cart from "./Components/Cart.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import ProductCategoryRoutes from "./ProductCategoryRoutes.js";

//Import functions
import ScrollToTop from "./Components/ScrollToTop.js";

/* React Render */
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <DataProvider>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <ProductCategoryRoutes />
          <Route path='/cart' exact component={Cart} />
        </Switch>
      </DataProvider>
    </Router>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
