"use client"
import React, { useState } from 'react';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic
  };

  return (
    <div className="overflow-hidden">
      <div className="mt-10 ml-10 m-5">
        <div className="h-64 w-auto max-w-3/4 flex items-center">
          <div className="w-full">
            <div>
              <h1 className="font-Josefin_Sans text-4xl font-bold">
                🔒 Reset Your Password
              </h1>
              
            </div>

            <div className='m-10'>
              <form onSubmit={handleSubmit}>
                <div className="input-field mb-4">
                  <label htmlFor="email" className="font-Josefin_Sans text-xl font-semibold">
                    Enter your email address to change password
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Your email address"
                    className="mt-2 p-3 w-full border rounded-3xl border-violet-500 focus:outline-none" 
                  />
                </div>
                <button type="submit" className="font-Josefin_Sans text-xl font-semibold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-2 border-purple-500 rounded-3xl p-3 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out">
                   Send Reset Link
                </button>
              </form>
            </div>

            <div className="mt-4 text-center">
              <a href="/login" className="font-Josefin_Sans text-lg text-indigo-500 hover:underline">
                🔑 Remembered your password? Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t-1 border-gray-700 text-black dark:text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-Josefin_Sans text-xl">
            © 2025 Job_Assist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PasswordResetPage;
