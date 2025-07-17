import React, { useState } from 'react';
import { Search, Candy, X } from 'lucide-react';
import shop from '../sweetManager';

export default function SweetSearch({ darkMode = true }) {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!name.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = shop.search({ name });
      setResults(res);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setName('');
    setResults([]);
  };

  const inputClass = darkMode
    ? 'bg-white/10 text-white placeholder-gray-400 border-gray-600 focus:border-purple-500 focus:ring-purple-500'
    : 'bg-white/70 text-slate-800 placeholder-gray-500 border-slate-300 focus:border-blue-400 focus:ring-blue-200';

  const cardText = darkMode ? 'text-white' : 'text-slate-800';

  return (
    <div className={`
      ${darkMode ? 'bg-white/10 text-white border-gray-700' : 'bg-white/40 text-slate-800 border-slate-200'}
      backdrop-blur-xl p-6 rounded-2xl shadow-2xl border hover:shadow-3xl transition-all duration-300 z-10
    `}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-sky-700 to-cyan-600 p-3 rounded-xl shadow-lg">
          <Search className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Search Sweets</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              className={`w-full p-3 pr-10 border-2 rounded-xl focus:outline-none transition-all duration-200 ${inputClass}`}
              placeholder="Search by sweet name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {name && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-gradient-to-r from-sky-800 to-sky-500 text-white px-6 py-3 rounded-xl hover: transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              {isLoading ? 'Searching...' : 'Search'}
            </div>
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Search Results</h3>
            <span className="bg-pink-100/10 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
              {results.length} found
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {results.map((sweet) => (
              <div
                key={sweet.id}
                className={`bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-400 p-2 rounded-lg">
                      <Candy className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-lg">{sweet.name}</span>
                      <div className="text-sm text-gray-400">
                        Category: <span className="font-medium">{sweet.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{sweet.price}</div>
                    <div className="text-sm">
                      Stock:{' '}
                      <span className={`font-medium ${sweet.quantity > 5 ? 'text-green-400' : 'text-red-400'}`}>
                        {sweet.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {results.length === 0 && name && !isLoading && (
        <div className="text-center py-8 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">No sweets found matching "{name}"</p>
          <p className="text-sm mt-1">Try searching with a different name</p>
        </div>
      )}
    </div>
  );
}
