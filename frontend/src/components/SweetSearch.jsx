import React, { useState } from 'react';
import shop from '../sweetManager';

export default function SweetSearch() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const res = shop.search({ name });
    setResults(res);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Search Sweets</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Enter sweet name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded mb-2">
        Search
      </button>
      {results.length > 0 && (
        <ul className="mt-2">
          {results.map((s) => (
            <li key={s.id} className="border p-2 mb-1 rounded">{s.name} - {s.category} - ₹{s.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}