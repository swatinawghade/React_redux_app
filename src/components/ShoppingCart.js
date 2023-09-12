import './style.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import './style.css'

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
    // Define a state variable to track the clicked button
const [clickedButton, setClickedButton] = useState(null);

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
      setClickedButton(item.id);
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    setClickedButton(item.id);
  };



  // Define your offers
  const offers = [
    { productId: 3, description: 'Buy one Cheese, get one free' },
    { productId: 4, description: 'Buy one Soup, get half price off on Bread' },
    { productId: 5, description: 'Get a third off Butter' },
  ];

  // Calculate the subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate the total discount
  const totalDiscount = cart.reduce((total, item) => {
    const offer = offers.find((o) => o.productId === item.id);
    let discountMultiplier = 1;

    if (offer && item.id === 3) {
      // Buy one Cheese, get one free
      discountMultiplier = Math.ceil(item.quantity / 2);
    } else if (offer && item.id === 4) {
      // Buy one Soup, get half price off on Bread
      const soupQuantity = item.quantity;
      const breadItems = cart.find((i) => i.id === 2);
      if (breadItems) {
        const maxDiscountedBreadItems = Math.floor(soupQuantity / 2);
        discountMultiplier = Math.min(breadItems.quantity, maxDiscountedBreadItems);
      }
    }

    return total + item.price * discountMultiplier;
  }, 0);

  // Calculate the total after applying discounts
  const totalAfterDiscount = subtotal - totalDiscount;

  return (
    <div className="w-full p-4 border ml-4">
      <h2 className="text-xl font-bold mb-4 text-left">Basket</h2><hr></hr>
      <table className="w-full">
        <tbody>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td className="text-left pr-14 text-black font-bold">{item.name}</td>
                <td className="py-2 pr-20 text-black font-bold"><span className='text-gray-500'>$ </span>{item.price.toFixed(2)}</td>
                <td>
                <button onClick={() => handleIncrement(item)} className={`bg-blue-500 text-white px-2 py-1 rounded ${clickedButton === item.id ? 'clicked' : ''}`}> + </button>
                  <span className='ml-2 mr-2 font-bold'>{item.quantity}</span>
                  <button onClick={() => handleDecrement(item)} className={`bg-blue-500 text-white px-2 py-1 rounded ${clickedButton === item.id ? 'clicked' : ''}`}> - </button>
                </td>
              </tr>
              <tr key={`${item.id}-total`} className="border-b">
                <td colSpan="3" className="text-right text-gray-500">
                Item Price: ${item.price.toFixed(2)} * {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
              {offers.find((o) => o.productId === item.id) && (

                <tr key={`${item.id}-saving`} className="border-b ">
                  <td colSpan="3" className="text-right text-red-500 font-bold">
                    Saving: ${((item.price * item.quantity) - (item.price * item.quantity * 0.5)).toFixed(2)}
                  </td>
                </tr>
              )}
              <tr key={`${item.id}-item-cost`} className="border-b">
                <td colSpan="3" className="text-right text-black font-bold">
                  Item Cost: ${(item.price * item.quantity * (1 - (offers.find((o) => o.productId === item.id) ? 0.5 : 0))).toFixed(2)}
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr className='text-black font-bold'>
            <td className="text-left">Sub Total:</td>
            <td colSpan="2" className="text-right">${subtotal.toFixed(2)}</td>
          </tr>
          <tr className='text-black font-bold'>
            <td className="text-left">Savings:</td>
            <td colSpan="2" className="text-right">${totalAfterDiscount.toFixed(2)}</td>
          </tr>
          <tr className='text-black font-bold'>
            <td className="text-left">Total Amount:</td>
            <td  colSpan="2" className="text-right">${totalDiscount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCart;
