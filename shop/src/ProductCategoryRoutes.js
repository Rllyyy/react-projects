import React from "react";
import { Route } from "react-router-dom";
import ContentGrid from "./Components/ContentGrid";

//useMemo here??
const ProductCategoryRoutes = (data) => {
  const routeArray = data.map((item) => {
    return <Route exact path={"/" + item.category} key={item.id} children={<ContentGrid type={item.category} />} />;
  });
  return routeArray;
};

export default ProductCategoryRoutes;
