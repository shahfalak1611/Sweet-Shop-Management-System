import React from 'react';
import SweetForm from './components/SweetForm';
import SweetList from './components/SweetList';
import SweetSearch from './components/SweetSearch';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Sweet Shop Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SweetForm />
        <SweetSearch />
      </div>
      <SweetList />
    </div>
  );
}