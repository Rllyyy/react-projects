import React, { useContext, useState, useEffect, useCallback } from "react";
import "./Cart.css";
import { CartContext } from "../Context/CartContext";
import { IoTrashSharp } from "react-icons/io5";

const Cart = () => {
  const [totalValue, setTotalValue] = useState(0);
  const cartData = useContext(CartContext);

  //Calculate the total cart amount by adding up all items in the cart
  //https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary/11832950#11832950
  const calculateCartTotal = useCallback(() => {
    let priceArray = cartData.state.cartList.map((cartElement) => {
      return cartElement.price * cartElement.quantity;
    });
    let totalPrice = priceArray.reduce((a, b) => a + b, 0);
    setTotalValue((Math.round((totalPrice + Number.EPSILON) * 100) / 100).toFixed(2));
  }, [cartData.state.cartList]);

  //Update the total Price
  useEffect(() => {
    calculateCartTotal();
  }, [calculateCartTotal, cartData.state.cartList]);

  //Remove item from cart when clicking on the trash icon
  const removeItemFromCart = (id) => {
    cartData.dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: id });
  };

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
          {cartData.state.cartList.map((cartItem) => {
            //destructure cartItem
            const { id, manufacturer, imageURL, price, product, quantity } = cartItem;
            return (
              <div className='cart-item' key={id}>
                <img className='item-picture' src={imageURL} alt={product} />
                <div className='item-description'>
                  <h3 className='item-name'>{product}</h3>
                  <p className='item-manufacturer'>{manufacturer}</p>
                  {/* <IoTrashSharp className='trash-icon' onClick={() => removeItemFromCart(id)} /> */}
                </div>
                <p className='item-price'>{price}€</p>
                {/* //TODO: Make this input or dropdown */}
                <p className='item-quantity'>{quantity}</p>
                <div className='subtotal-remove-container'>
                  <p className='item-subtotal'>{(Math.round(price * quantity * 100) / 100).toFixed(2)}€</p>
                  <p className='item-remove' onClick={() => removeItemFromCart(id)}>
                    Remove Item
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
