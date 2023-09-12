// App.js
import './components/style.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, selectCart, selectTotal } from './features/cart/cartSlice';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const products = [
    { id: 1, name: 'Bread', price: 1.10 },
    { id: 2, name: 'Milk', price: 0.50 },
    { id: 3, name: 'Cheese', price: 0.90 },
    { id: 4, name: 'Soup', price: 0.60 },
    { id: 5, name: 'Butter', price: 1.20 },
  ];
  const cart = useSelector(selectCart);
  const total = useSelector(selectTotal);

  return (
<div className="App flex justify-center items-center min-h-screen w-screen h-screen">
      <div className="flex">
        <ProductList
          products={products}
          addToCart={(product) => dispatch(addToCart(product))}
/>
        <ShoppingCart cart={cart} total={total} />
      </div>
    </div>
  );
}

export default App;
