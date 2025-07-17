import React, { useEffect, useState } from 'react';
import SweetForm from './components/SweetForm';
import SweetSearch from './components/SweetSearch';
import SweetTable from './components/SweetTable';
import shop from './sweetManager';
import laddoo from './assets/laddoo.png';         // Make sure this image has transparent background
import gulabJamun from './assets/gulabjamun.png'; // Transparent recommended

const App = () => {
  const [sweets, setSweets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const refreshSweets = () => {
    const saved = localStorage.getItem('sweets');
    if (saved) {
      shop.setSweets(JSON.parse(saved));
    }
    // const all = shop.getAllSweets();
    // setSweets([...all]);
    // setSearchResults([]);
    const all = shop.sortSweets('id');
    setSweets([...all]);
  };

  const persistSweets = () => {
    localStorage.setItem('sweets', JSON.stringify(shop.getAllSweets()));
  };

  useEffect(() => {
    refreshSweets();
  }, []);

  const handleAdd = (sweet) => {
    try {
      shop.addSweet(sweet);
      persistSweets();
      alert('Sweet added!');
      refreshSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = (id) => {
    try {
      shop.deleteSweet(id);
      persistSweets();
      refreshSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePurchase = (id, quantity) => {
    try {
      shop.purchaseSweet(id, quantity);
      persistSweets();
      refreshSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRestock = (id, quantity) => {
    try {
      shop.restockSweet(id, quantity);
      persistSweets();
      refreshSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdate = (id, updates) => {
    try {
      shop.updateSweet(id, updates);
      persistSweets();
      refreshSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSort = (field) => {
    try {
      const sorted = shop.sortSweets(field);
      setSweets([...sorted]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = (criteria) => {
    try {
      const results = shop.search(criteria);
      setSearchResults([...results]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-pink-500 rounded-full blur-2xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-44 h-44 bg-blue-500 rounded-full blur-3xl opacity-25 animate-pulse delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-yellow-500 rounded-full blur-2xl opacity-20 animate-pulse delay-6000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-4 justify-center">
            <img src={laddoo} alt="Laddoo" className="w-18 h-16 object-contain" style={{ backgroundColor: 'transparent' }} />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-blue-300 drop-shadow-md pb-5">
              Sweet Shop Management System
            </h1>
            <img src={gulabJamun} alt="Gulab Jamun" className="w-18 h-16 object-contain" style={{ backgroundColor: 'transparent' }} />
          </div>
          <p className="text-xl text-white/70 mt-2">Manage your inventory of delicious sweets with ease!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <SweetForm onAdd={handleAdd} darkMode={true} />
          <SweetSearch onSearch={handleSearch} results={searchResults} darkMode={true} />
        </div>

        <SweetTable
          sweets={searchResults.length > 0 ? searchResults : sweets}
          onDelete={handleDelete}
          onPurchase={handlePurchase}
          onRestock={handleRestock}
          onUpdate={handleUpdate}
          onSort={handleSort}
          darkMode={true}
        />
      </div>
    </div>
  );
};

export default App;
