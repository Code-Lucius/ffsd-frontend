import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

// GET CSRF TOKEN

const getCsrfToken = async () => {
  // I had to make an extra call to get CSRF token
  const response = await fetch('/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
  });

  if (!response.ok) {
      console.error('Failed to set CSRF token');
  } else {
      console.log('CSRF token set');
  }
};

export default function SignUp(){

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

    const validateForm = () => {
      const newErrors = {};
  
      // Validate first name
      if (!formData.first_name.trim()) {
        newErrors.first_name = 'First Name is required';
      }
  
      // Validate last name
      if (!formData.last_name.trim()) {
        newErrors.last_name = 'Last Name is required';
      }
  
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
  
      // Validate password
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
  
      // Validate confirm password
      if (!formData.password_confirmation) {
        newErrors.password_confirmation = 'Please confirm your password';
      } else if (formData.password_confirmation !== formData.password) {
        newErrors.password_confirmation = 'Passwords do not match';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      await getCsrfToken();
      if (validateForm()) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              alert('Registration successful! Please verify your email.');
              navigate('/');
          } else {
              const errorData = await response.json();
              alert(errorData.message || 'Error registering user');
          }
      } catch (error) {
          console.error('Error:', error);
      }
      }
    };
  
    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign up for a new account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                  <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
              </div>

              <div>
                  <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already a member?{' '}
              <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</Link>
            </p>
          </div>
        </div>
      </>
    );
}