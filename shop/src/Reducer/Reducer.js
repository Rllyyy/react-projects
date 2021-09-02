const getInitialCart = () => {
  let localStorageItem = localStorage.getItem("cart-items");

  if (localStorageItem) {
    return (localStorageItem = JSON.parse(localStorageItem));
  } else {
    return (localStorageItem = []);
  }
};

const updateLocalStorage = (updatedCart) => {
  localStorage.setItem("cart-items", JSON.stringify(updatedCart), { sameSite: "strict", secure: true });
};

const addItemToCart = (item, cartList) => {
  //destructure item
  const { id, manufacturer, productName, imageURL, price } = item;

  let newItem = true;

  //Check if item not already in cart. If so, update the item quantity count else just return the item
  let newCartList = cartList.map((cartItem) => {
    if (cartItem.id === id) {
      //item already in array
      const newItemQuantity = cartItem.quantity + 1;
      newItem = false;
      return { ...cartItem, quantity: newItemQuantity };
    } else {
      return cartItem;
    }
  });

  //Add item to array if it's really new
  if (newItem) {
    newCartList.push({ id: id, manufacturer: manufacturer, product: productName, imageURL: imageURL, price: price, quantity: 1 });
  }

  //Update local storage with new item
  updateLocalStorage(newCartList);

  //Return new Cart List to reducer
  return newCartList;
};

const removeItemFromCart = (id, cartList) => {
  let updatedCartList = cartList.filter((item) => item.id !== id);
  updateLocalStorage(updatedCartList);
  return updatedCartList;
};

const changeItemQuantity = (id, updatedQuantity, cartList) => {
  //console.log(typeof updatedQuantity);
  //only positive numbers are allowed to be passed into quantity (in the cart)
  if (isNaN(updatedQuantity)) {
    return cartList;
  }

  //only positive numbers are allowed to be passed into quantity (in the cart)
  //needs to be converted to a string so index of can work as the passed value is sometimes a string and sometimes int (ugly i know)
  if (updatedQuantity.toString().indexOf("-") > -1) {
    return cartList;
  }

  let newCartList = cartList.map((cartItem) => {
    if (cartItem.id === id) {
      //change quantity value of cart item. The || is needed to allow the input to be empty
      return { ...cartItem, quantity: parseInt(updatedQuantity) || updatedQuantity };
    } else {
      //item not already in array
      return cartItem;
    }
  });
  //Update local storage with new item
  updateLocalStorage(newCartList);

  //Return new Cart List to reducer
  return newCartList;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        cartList: addItemToCart(action.payload.item, state.cartList),
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cartList: removeItemFromCart(action.payload, state.cartList),
      };
    case "CHANGE_ITEM_QUANTITY": {
      return {
        ...state,
        cartList: changeItemQuantity(action.payload.id, action.payload.quantity, state.cartList),
      };
    }
    default:
      throw new Error("No matching action type");
  }
};

export const init = {
  cartList: getInitialCart(),
};
