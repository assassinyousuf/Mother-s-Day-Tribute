import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, LogIn, Heart } from 'lucide-react';

const Auth = ({ onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuthSuccess();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl max-w-md w-full mx-auto">
      <div className="mb-8 text-center">
        <div className="bg-primary-100 p-3 rounded-full inline-block mb-4">
          <Heart className="w-8 h-8 text-primary-500 fill-primary-500" />
        </div>
        <h2 className="text-2xl font-playfair font-bold text-primary-900">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          {isSignUp ? 'Join us to save and share your tribute' : 'Log in to manage your tributes'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="w-full space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none bg-white/50"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none bg-white/50"
            required
          />
        </div>

        <button
          disabled={loading}
          className="btn-premium w-full flex items-center justify-center gap-2 py-3"
        >
          {loading ? 'Processing...' : isSignUp ? <><UserPlus className="w-5 h-5" /> Sign Up</> : <><LogIn className="w-5 h-5" /> Log In</>}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-primary-600 font-bold hover:underline"
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
