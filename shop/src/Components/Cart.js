import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import "./Cart.css";
import { CartContext } from "../Context/CartContext";
import { RiArrowDropDownLine } from "react-icons/ri";

const Cart = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [showQuantity, setShowQuantity] = useState([]);

  const cartData = useContext(CartContext);
  const quantityInputRef = useRef(null);

  //const vars = ["a", "b"];
  //const childRefs = React.useMemo(() => cartData.state.cartList.map(() => React.createRef()), [cartData.state.cartList.join(",")]);

  //Calculate the total cart amount by adding up all items in the cart
  //https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary/11832950#11832950
  const calculateCartTotal = useCallback(() => {
    let priceArray = cartData.state.cartList.map((cartElement) => {
      return cartElement.price * cartElement.quantity;
    });
    let totalPrice = priceArray.reduce((a, b) => a + b, 0);
    setTotalValue((Math.round((totalPrice + Number.EPSILON) * 100) / 100).toFixed(2));
  }, [cartData.state.cartList]);

  //Handle the quantity change of the dropdown by updating the reducer and then hiding the opened dropdown
  const dropdownQuantityChange = (e, id) => {
    handleItemQuantityChange(id, e.target.value);
    updateShowQuantity(id, false);
  };

  //Hide the dropdown quantity on the next click.
  const hideDropDownOnNextClick = useCallback(
    (e) => {
      //TODO Memo this probably
      if (
        showQuantity
          .map((item) => {
            return item.show;
          })
          .every((show) => show === false)
      ) {
        return;
      }

      //dropdown items and the arrow are excluded because dropdownQuantityChange() handles this
      if (e.target.className !== "dropdown-item" && e.target.className.baseVal !== "dropdown-arrow dropdown-arrow-active" && e.target.className.baseVal !== "") {
        let arr = showQuantity.map((item) => {
          return { ...item, show: false };
        });
        setShowQuantity(arr);
      }
    },
    [showQuantity]
  );

  //Focus Cart Item input
  const focusQuantityInput = (id) => {
    //! quantityRef must also be array
    //childRefs[1].current.focus();
    updateShowQuantity(id, false);
  };

  const updateShowQuantity = (id, show) => {
    let arr = showQuantity.map((cartItemQ) => {
      if (cartItemQ.id === id) {
        return { ...cartItemQ, show: show };
      } else {
        return cartItemQ;
      }
    });
    setShowQuantity(arr);
  };

  //Update the total Price
  useEffect(() => {
    calculateCartTotal();
  }, [calculateCartTotal, cartData.state.cartList]);

  //Close dropdown
  //https://stackoverflow.com/questions/55360736/how-do-i-window-removeeventlistener-using-react-useeffect
  useEffect(() => {
    //return if showQuantity doesn't exist yet. Basically applies to first first mount. Once fixed a bug I can't reproduce anymore
    if (!showQuantity) {
      return;
    }

    //add eventListener for next click
    window.addEventListener("mousedown", hideDropDownOnNextClick);
    return () => {
      window.removeEventListener("mousedown", hideDropDownOnNextClick);
    };
  }, [showQuantity, hideDropDownOnNextClick]);

  //Fill show Quantity. Should also update if items are removed so it doesn't break the index used by showQuantity in JSX
  useEffect(() => {
    let showQuantityItems = cartData.state.cartList.map((item) => {
      return { id: item.id, show: false };
    });
    setShowQuantity(showQuantityItems);
  }, [cartData.state.cartList]);

  //Remove item from cart when clicking on the trash icon
  const removeItemFromCart = (id) => {
    cartData.dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: id });
  };

  //Change the quantity count of an item in a cart
  const handleItemQuantityChange = (id, newQuantity) => {
    cartData.dispatch({ type: "CHANGE_ITEM_QUANTITY", payload: { id: id, quantity: newQuantity } });
  };

  //Push items to the Dropdown menu for each item in the cart
  const ItemQuantityOptions = ({ id }) => {
    let quantityOptions = [];
    for (let i = 1; i <= 4; i++) {
      quantityOptions.push(
        <li className='dropdown-item' key={`dropdown-item-${i}`} value={i} onClick={(e) => dropdownQuantityChange(e, id)}>
          {i}
        </li>
      );
    }
    return (
      <ul className='dropdown'>
        <li className='dropdown-item' onClick={() => removeItemFromCart(id)}>
          0 (Remove)
        </li>
        {quantityOptions}
        <li className='dropdown-item' onClick={() => focusQuantityInput(id)}>
          Custom
        </li>
      </ul>
    );
  };

  //JSX
  return (
    <main className='cart'>
      <h2>Cart Content</h2>
      <section className='cart-table'>
        <div className='cart-table-heading'>
          <span className='cart-table-heading-item'>Item</span>
          <span className='cart-table-heading-item-description'></span>
          <span className='cart-table-heading-price'>Price</span>
          <span className='cart-table-heading-quality'>Quantity</span>
          <span className='cart-table-heading-subtotal'>Subtotal</span>
        </div>
        <div className='cart-items'>
          {cartData.state.cartList.map((cartItem, index) => {
            //destructure cartItem
            const { id, manufacturer, imageURL, price, product, quantity } = cartItem;
            return (
              <div className='cart-item' key={id}>
                <img className='item-picture' src={imageURL} alt={product} />
                <div className='item-description'>
                  <h3 className='item-name'>{product}</h3>
                  <p className='item-manufacturer'>{manufacturer}</p>
                </div>
                <p className='item-price'>{price}€</p>
                <div className='quantity-container'>
                  {/* //TODO Make the ref dynamic  */}
                  <input className='item-quantity' value={quantity} onChange={(e) => handleItemQuantityChange(id, e.target.value)} required />
                  {showQuantity.length > 0 && (
                    <button className='dropdown-arrow-wrapper'>
                      <RiArrowDropDownLine
                        className={`dropdown-arrow ${showQuantity[index].show ? "dropdown-arrow-active" : ""}`}
                        onClick={() => updateShowQuantity(id, !showQuantity[index].show)}
                      />
                    </button>
                  )}
                  {showQuantity.length > 0 && showQuantity[index].show && <ItemQuantityOptions id={id} />}
                </div>
                <div className='subtotal-remove-container'>
                  <p className='item-subtotal'>{(Math.round(price * quantity * 100) / 100).toFixed(2)}€</p>
                  <p className='item-remove' onClick={() => removeItemFromCart(id)}>
                    {quantity >= 2 ? "Remove Items" : "Remove Item"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className='cart-total'>
          <p>Total: {totalValue}€</p>
        </div>
      </section>
    </main>
  );
};

export default Cart;
