import React, { useState } from 'react';
import shop from '../sweetManager';

export default function SweetForm() {
  const [form, setForm] = useState({ id: '', name: '', category: '', price: '', quantity: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      shop.addSweet({
        id: Number(form.id),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      alert('Sweet added!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Sweet</h2>
      {['id', 'name', 'category', 'price', 'quantity'].map((field) => (
        <input
          key={field}
          className="w-full mb-2 p-2 border rounded"
          placeholder={field}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}