import React, { useState } from 'react';
import { Plus, Candy } from 'lucide-react';

export default function SweetForm({ onAdd, darkMode }) {
  const [form, setForm] = useState({ id: '', name: '', category: '', price: '', quantity: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newSweet = {
        id: Number(form.id),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };

      onAdd(newSweet);
      setForm({ id: '', name: '', category: '', price: '', quantity: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  const baseInputClasses =
    'w-full p-3 border rounded-xl focus:outline-none transition-all duration-200';
  const inputClasses = darkMode
    ? `${baseInputClasses} bg-white/10 text-white border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-gray-400`
    : `${baseInputClasses} bg-white/70 text-slate-800 border-slate-300 focus:border-blue-400 focus:ring-blue-200`;

  return (
    <div className={`
      p-6 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 z-10 
      ${darkMode
        ? 'bg-white/10 border-gray-700 text-white'
        : 'bg-white/40 border-slate-200 text-slate-800'}
    `}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-sky-700 to-cyan-600
p-3 rounded-xl shadow-lg">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Add New Sweet</h2>
        <Candy className="w-6 h-6 text-pink-400" />
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Sweet ID</label>
            <input
              name="id"
              type="number"
              className={inputClasses}
              placeholder="Enter unique ID"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Sweet Name</label>
            <input
              name="name"
              type="text"
              className={inputClasses}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
            name="category"
            className="w-full p-3 border-2 border-purple-500 text-white bg-gray-800 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-200"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            >
                <option value="" disabled className="bg-gray-800 text-white">Select Category</option>
                <option value="Pastry" className="bg-gray-800 text-white">Pastry</option>
                <option value="Syrup" className="bg-gray-800 text-white">Syrup</option>
                <option value="Sponge" className="bg-gray-800 text-white">Sponge</option>
                <option value="Dry Fruit" className="bg-gray-800 text-white">Dry Fruit</option>
                <option value="Fried" className="bg-gray-800 text-white">Fried</option>
                <option value="Milk Based" className="bg-gray-800 text-white">Milk Based</option>
                <option value="Chocolate" className="bg-gray-800 text-white">Chocolate</option>
            </select>

          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Price (₹)</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              className={inputClasses}
              placeholder="Enter price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="0"
              className={inputClasses}
              placeholder="Enter quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-sky-800 to-sky-500 text-white py-3 px-6 rounded-xl hover: transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add Sweet to Inventory
          </div>
        </button>
      </form>
    </div>
  );
}
