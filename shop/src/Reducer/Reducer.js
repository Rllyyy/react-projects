const getInitialCart = () => {
  let localStorageItem = localStorage.getItem("cart-items");

  if (localStorageItem) {
    return (localStorageItem = JSON.parse(localStorageItem));
  } else {
    return (localStorageItem = []);
  }
};

const itemToLocalStorage = (item) => {
  //console.log("hello");
  //destructure item
  const { id, productName, imageURL, price } = item;

  //return;
  //check if item already in cart

  //item not in cart
  let localStorageBeforeAddedItem = localStorage.getItem("cart-items");
  let storage = JSON.parse(localStorageBeforeAddedItem);

  if (localStorageBeforeAddedItem) {
    storage = JSON.parse(localStorageBeforeAddedItem);
  } else {
    storage = [];
  }

  storage.push({ id: id, product: productName, imageURL: imageURL, price: price });

  localStorage.setItem("cart-items", JSON.stringify(storage));
  return storage;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      //itemToLocalStorage(action.payload.item);
      return {
        ...state,
        cartList: itemToLocalStorage(action.payload.item),
      };
    default:
      throw new Error("No matching action type");
  }
};

export const init = {
  cartList: getInitialCart(),
};
