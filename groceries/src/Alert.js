import React from "react";

const Alert = ({ msg, type }) => {
  const getBackgroundColor = (type) => {
    let backgroundColor;
    switch (type) {
      case "error":
        backgroundColor = "rgb(233, 21, 14)";
        break;
      case "success":
        backgroundColor = "rgb(30, 215, 96)";
        break;
      case "update":
        backgroundColor = "rgb(0, 199, 221)";
        break;
      case "item_removed":
        backgroundColor = "rgb(255, 66, 121)";
        break;
      case "list_cleared":
        backgroundColor = "rgb(255, 66, 121)";
        break;
      default:
        backgroundColor = "rgb(30, 215, 96)";
        break;
    }
    return backgroundColor;
  };
  return (
    <p className='alert' style={{ backgroundColor: getBackgroundColor(type) }}>
      {msg}
    </p>
  );
};

export default Alert;
