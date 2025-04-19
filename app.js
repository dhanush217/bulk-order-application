// This is a simplified version of a bulk order app using React + basic state management

import React, { useState } from "react";
import './app.css';
const sampleProducts = [
  { id: 1, name: "Tomatoes", stock: 100, price: 20 },
  { id: 2, name: "Potatoes", stock: 80, price: 15 },
  { id: 3, name: "Mangoes", stock: 50, price: 50 },
];

export default function App() {
  const [products, setProducts] = useState(sampleProducts);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const placeOrder = (productId, quantity) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, stock: p.stock - quantity } : p
      )
    );
    const product = products.find(p => p.id === productId);
    setOrders([...orders, { ...product, quantity, status: "Pending" }]);
  };

  const updateOrderStatus = (index, status) => {
    const newOrders = [...orders];
    newOrders[index].status = status;
    setOrders(newOrders);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bulk Order App</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsAdmin(!isAdmin)}
      >
        Switch to {isAdmin ? "Buyer" : "Admin"} View
      </button>

      {!isAdmin ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Available Products</h2>
          {products.map(product => (
            <div key={product.id} className="mb-2">
              <span>{product.name} - ₹{product.price}/kg - Stock: {product.stock}</span>
              <button
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => placeOrder(product.id, 10)}
              >
                Order 10kg
              </button>
            </div>
          ))}
          <h3 className="mt-4 font-semibold">My Orders</h3>
          {orders.map((o, i) => (
            <div key={i}>{o.name} - {o.quantity}kg - {o.status}</div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
          <h3 className="font-semibold">Orders</h3>
          {orders.map((o, i) => (
            <div key={i} className="mb-2">
              {o.name} - {o.quantity}kg - {o.status}
              <button
                className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => updateOrderStatus(i, "Shipped")}
              >
                Mark as Shipped
              </button>
            </div>
          ))}

          <h3 className="mt-4 font-semibold">Inventory</h3>
          {products.map(p => (
            <div key={p.id}>{p.name} - Stock: {p.stock}</div>
          ))}
        </div>
      )}
    </div>
  );
}
