import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        {showForgotPassword ? (
          // Forgot Password Page
          <>
            <div className="bg-white border border-instagram-border rounded-lg p-8 mb-4">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Trouble logging in?</h2>
                <p className="text-sm text-instagram-gray">Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
              </div>
              
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Email, Phone, or Username"
                  className="w-full px-3 py-2 border border-instagram-border rounded-sm text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-instagram-blue text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors mt-4"
                >
                  Send login link
                </button>
              </form>
              
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-instagram-border"></div>
                <span className="px-4 text-sm text-instagram-gray font-semibold">OR</span>
                <div className="flex-1 border-t border-instagram-border"></div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => (setShowForgotPassword(false), setIsLogin(false))}
                  className="text-sm font-semibold text-gray-900 hover:underline"
                >
                  Create new account
                </button>
              </div>
            </div>
            
            <div className="bg-white border border-instagram-border rounded-lg p-6 text-center">
              <button

              // i want to retun in sing up page if i click on create a account
                onClick={() => setShowForgotPassword(isLogin)}
                className="text-sm text-instagram-blue font-semibold hover:underline"
              >
                Back to login
              </button>
            </div>
          </>
        ) : (
        <>
          {/* Main Card */}
          <div className="bg-white border border-instagram-border rounded-lg p-8 mb-4">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Instagram</h1>
            </div>

          {/* Form */}
          <form className="space-y-3">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-instagram-border rounded-sm text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none"
              />
            )}
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="w-full px-3 py-2 border border-instagram-border rounded-sm text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-instagram-border rounded-sm text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none"
            />
            
            <button
              type="submit"
              className="w-full bg-instagram-blue text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors mt-4"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-instagram-border"></div>
            <span className="px-4 text-sm text-instagram-gray font-semibold">OR</span>
            <div className="flex-1 border-t border-instagram-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                window.location.href = 'https://www.facebook.com/login.php/';
              }}
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>

              <span>Continue with Facebook</span>
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-6">
              <button 
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-instagram-blue hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>
          {/* Toggle Card */}
          <div className="bg-white border border-instagram-border rounded-lg p-6 text-center">
            <p className="text-sm">
              {isLogin ? "Don't have an account? " : "Have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-instagram-blue font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

          {/* App Download */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-4">Get the app.</p>
            <div className="flex justify-center space-x-2">
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                alt="Download on the App Store"
                className="h-10"
              />
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                alt="Get it on Google Play"
                className="h-10"
              />
            </div>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default App;