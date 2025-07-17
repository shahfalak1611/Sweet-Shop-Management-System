import React, { useState } from 'react';
import {
  Store,
  Edit,
  Trash2,
  ShoppingCart,
  RotateCcw,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';

const SweetTable = ({ sweets, onDelete, onPurchase, onRestock, onUpdate, onSort }) => {
  const [sortBy, setSortBy] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleSort = (value) => {
    setSortBy(value);
    onSort(value);
  };

  const handleDeleteConfirm = (id) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = () => {
    onDelete(showDeleteConfirm);
    setShowDeleteConfirm(null);
  };

  const getStockStatus = (quantity) => {
    if (quantity > 10) return { color: 'green', text: 'In Stock' };
    if (quantity > 5) return { color: 'yellow', text: 'Low Stock' };
    if (quantity > 0) return { color: 'red', text: 'Very Low' };
    return { color: 'gray', text: 'Out of Stock' };
  };

const getStockBadge = (quantity) => {
  const status = getStockStatus(quantity);
  const colorClasses = {
    green: 'bg-green-100 text-green-700 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide border ${colorClasses[status.color]}`}
    >
      {quantity} ({status.text})
    </span>
  );
};

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 z-10 text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-sky-700 to-cyan-600
 p-3 rounded-xl shadow-lg">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Available Sweets</h2>
            <p className="text-sm text-slate-300">Total: {sweets.length} items</p>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            className="appearance-none w-full sm:w-auto border-2 border-purple-500 px-4 py-2 pr-8 rounded-xl bg-gray-800 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all duration-200"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 pointer-events-none" />
        </div>
      </div>

      {/* Table or Empty State */}
      {sweets.length === 0 ? (
        <div className="text-center py-12 text-slate-300">
          <Store className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-xl">No sweets in inventory</p>
          <p className="text-sm mt-2">Add some sweets to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[700px] w-full text-sm sm:text-base table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-sky-800 to-sky-500
 p-3 rounded-xl shadow-lg text-left text-white">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sweets.map((sweet, index) => (
                <tr
                  key={sweet.id}
                  className={`border-b border-slate-800 hover:bg-white/10 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white/5' : 'bg-white/0'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {sweet.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{sweet.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block whitespace-nowrap bg-gray-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide">
                      {sweet.category}
                    </span>

                  </td>
                  <td className="px-6 py-4 text-white font-semibold text-lg">₹{sweet.price}</td>
                  <td className="px-6 py-4">{getStockBadge(sweet.quantity)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        onClick={() => handleDeleteConfirm(sweet.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        title="Delete Sweet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const quantity = parseInt(prompt(`Purchase ${sweet.name} - Enter quantity:`, '1'), 10);
                          if (!isNaN(quantity) && quantity > 0) {
                            if (quantity <= sweet.quantity) {
                              onPurchase(sweet.id, quantity);
                            } else {
                              alert(`Only ${sweet.quantity} items available in stock!`);
                            }
                          }
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        title="Purchase Sweet"
                        disabled={sweet.quantity === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const quantity = parseInt(prompt(`Restock ${sweet.name} - Enter quantity to add:`, '10'), 10);
                          if (!isNaN(quantity) && quantity > 0) onRestock(sweet.id, quantity);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        title="Restock Sweet"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const name = prompt('Update name:', sweet.name);
                          const category = prompt('Update category:', sweet.category);
                          const price = parseFloat(prompt('Update price:', sweet.price));
                          const quantity = parseInt(prompt('Update quantity:', sweet.quantity), 10);

                          if (name && category && !isNaN(price) && !isNaN(quantity)) {
                            onUpdate(sweet.id, { name, category, price, quantity });
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        title="Update Sweet"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this sweet? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetTable;
