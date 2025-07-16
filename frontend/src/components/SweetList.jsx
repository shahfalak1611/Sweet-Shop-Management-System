import React, { useState } from 'react';
import shop from '../sweetManager';

export default function SweetList() {
  const [sweets, setSweets] = useState(shop.getAllSweets());

  const refresh = () => setSweets(shop.getAllSweets());

  const handleDelete = (id) => {
    try {
      shop.deleteSweet(id);
      refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white mt-6 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Available Sweets</h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            {['ID', 'Name', 'Category', 'Price', 'Qty', 'Actions'].map((h) => (
              <th key={h} className="border px-2 py-1">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sweets.map(sweet => (
            <tr key={sweet.id} className="border">
              <td className="border px-2 py-1">{sweet.id}</td>
              <td className="border px-2 py-1">{sweet.name}</td>
              <td className="border px-2 py-1">{sweet.category}</td>
              <td className="border px-2 py-1">{sweet.price}</td>
              <td className="border px-2 py-1">{sweet.quantity}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleDelete(sweet.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}