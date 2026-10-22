'use client';
import React, { useState } from 'react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.username === 'admin' && user.password === 'password123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={() => setIsLoggedIn(false)} className="text-red-500 hover:underline">Logout</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add New Song</h2>
          <p className="text-gray-500 mb-4">Note: In this demo, changes are local to the session.</p>
          <div className="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Song Title" className="p-2 border rounded" />
            <input type="text" placeholder="Artist" className="p-2 border rounded" />
            <textarea placeholder="Chords (e.g. [C] Hello [G] World)" className="p-2 border rounded h-32" />
            <button className="bg-green-600 text-white p-2 rounded font-bold">Save Song</button>
          </div>
        </div>
      </div>
    </div>
  );
}
