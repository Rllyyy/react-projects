const getInitialCart = () => {
  let localStorageItem = localStorage.getItem("cart-items");

  if (localStorageItem) {
    return (localStorageItem = JSON.parse(localStorageItem));
  } else {
    return (localStorageItem = []);
  }
};

const itemToLocalStorage = (item, cartList) => {
  //destructure item
  const { id, manufacturer, productName, imageURL, price } = item;

  let newItem = true;
  let newCartList;

  //Check if item not already in cart. If so, update the item quantity count else just return the item
  newCartList = cartList.map((cartItem) => {
    if (cartItem.id === id) {
      //item already in array
      const newItemQuantity = cartItem.quantity + 1;
      newItem = false;
      return { ...cartItem, quantity: newItemQuantity };
    } else {
      //item not already in array
      return cartItem;
    }
  });

  //Add item to array if it's really new
  if (newItem) {
    newCartList.push({ id: id, manufacturer: manufacturer, product: productName, imageURL: imageURL, price: price, quantity: 1 });
  }

  //Update local storage with new item
  localStorage.setItem("cart-items", JSON.stringify(newCartList));

  //Return new Cart List to reducer
  return newCartList;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        cartList: itemToLocalStorage(action.payload.item, state.cartList),
      };
    default:
      throw new Error("No matching action type");
  }
};

export const init = {
  cartList: getInitialCart(),
};
