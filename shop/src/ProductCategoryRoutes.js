import React, { useContext } from "react";
import { DataContext } from "./DataContext";
import { Route } from "react-router-dom";
import ContentGrid from "./Components/ContentGrid";

const ProductCategoryRoutes = () => {
  const data = useContext(DataContext);
  return data.map((item) => {
    return <Route exact path={"/" + item.category} key={item.id} children={<ContentGrid type={item.category} />} />;
  });
};

export default ProductCategoryRoutes;
