// ProductList.js
import './style.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';


const products = [
  { id: 1, name: 'Bread', price: 1.10 },
  { id: 2, name: 'Milk', price: 0.50 },
  { id: 3, name: 'Cheese', price: 0.90 },
  { id: 4, name: 'Soup', price: 0.60 },
  { id: 5, name: 'Butter', price: 1.20 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [buttonStates, setButtonStates] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setButtonStates((prevState) => ({
      ...prevState,
      [product.id]: true, // Set the clicked button's state to true
    }));
  };

  return (
    <div className="w-3/4 p-4 border ">
      <div>
      <h2 className="text-xl font-bold mb-4 text-left">Products</h2><hr></hr>
      <table className="w-full font-bold">
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b text-left">
              <td className="pr-14">{product.name}</td>
              <td className="py-2"><span className='text-gray-500'>$ </span>{product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleAddToCart(product)}
                                  className={`${
                                    buttonStates[product.id] ? 'bg-gray-400' : 'bg-blue-500'
                                  } text-white px-2 py-1 rounded`}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
      <div className='mt-10 mb-5'><hr></hr></div>
      <div className="border-b">
      <table className="border-b">
        <tr className="border-b font-bold"><td>Special Offers</td></tr>
        <tr className="border-b"><td>Offer Details</td></tr>
        <tr className="border-b"><td>when you buy a cheese, you get a second cheese free</td></tr>
        <tr className="border-b"><td>when you buy a Soup, you get a half price Bread !</td></tr>
        <tr className="border-b"><td>Get a third off Butter</td></tr>
      </table></div>
    </div>
  );
};

export default ProductList;
