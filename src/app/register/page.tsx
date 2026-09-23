'use client';

// Esta pantalla no se genera al construir el sitio.
//
// Crea el cliente de Supabase al cargarse, y durante la construcción no hay
// sesión ni navegador: el prerenderizado fallaba y tumbaba la publicación
// entera. Al marcarla como dinámica se arma cuando alguien la visita, que es
// cuando sí existe todo lo que necesita.
export const dynamic = 'force-dynamic';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, countryCodes } from '@/lib/supabase';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    country_code: '+56', // Default to Chile
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.username.trim()) {
      setError('Please enter a username');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.phone_number.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (!/^\d+$/.test(formData.phone_number.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number (numbers only)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Submitting registration form...');

      const { data, error } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.full_name,
          username: formData.username,
          phone_number: formData.phone_number,
          country_code: formData.country_code,
        }
      );

      if (error) {
        console.error('Registration error:', error);
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          setError('This email is already registered. Please try logging in instead.');
        } else if (error.message.includes('Invalid email')) {
          setError('Please enter a valid email address.');
        } else if (error.message.includes('timed out')) {
          setError('Registration timed out. Please check your internet connection and try again.');
        } else if (error.message.includes('username')) {
          setError('This username is already taken. Please choose a different one.');
        } else {
          setError(error.message || 'An error occurred during registration');
        }
      } else {
        console.log('Registration successful!');
        setSuccess(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login?registered=true');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Unexpected registration error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCountry = () => {
    return countryCodes.find(country => country.code === formData.country_code);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Success Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        </div>

        <div className="max-w-md w-full space-y-8 relative z-10 text-center">
          {/* Success Animation */}
          <div className="animate-bounce">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          {/* Success Messages */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome to WellnessHub! 🎉
            </h2>
            <p className="text-xl text-gray-700 font-medium">
              Account created successfully!
            </p>
            <p className="text-gray-600">
              Redirecting you to sign in...
            </p>
          </div>

          {/* Professional Loading Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full" style={{
              animation: 'loading 2s ease-in-out forwards',
            }}></div>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Join WellnessHub
          </h1>
          <p className="text-slate-600">
            Create your account and start your wellness journey
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                placeholder="Choose a unique username"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Must be at least 3 characters long</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-3">
                <select
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleInputChange}
                  className="w-32 px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 text-sm"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              {getSelectedCountry() && (
                <p className="text-xs text-slate-500 mt-1">
                  {getSelectedCountry()?.flag} {getSelectedCountry()?.country}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">Must be at least 6 characters long</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </span>
              ) : (
                '🚀 Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="underline hover:text-slate-700">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy" className="underline hover:text-slate-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}