'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      image: '/api/placeholder/80/80',
      category: 'electronics',
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      price: 1299,
      image: '/api/placeholder/80/80',
      category: 'electronics',
      quantity: 1,
      inStock: true
    },
    {
      id: 3,
      name: 'Leather Jacket',
      price: 299,
      image: '/api/placeholder/80/80',
      category: 'fashion',
      quantity: 2,
      inStock: true
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {/* Empty Cart */}
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/shop"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              Start Shopping
            </Link>
          </div>

          {/* Recently Viewed */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md p-4">
                  <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Product {item}</h4>
                  <p className="text-indigo-600 font-bold">$99.99</p>
                  <button className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Cart Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-5 text-sm font-medium text-gray-500">PRODUCT</div>
                <div className="col-span-2 text-sm font-medium text-gray-500">PRICE</div>
                <div className="col-span-3 text-sm font-medium text-gray-500">QUANTITY</div>
                <div className="col-span-2 text-sm font-medium text-gray-500">TOTAL</div>
              </div>

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-gray-200 last:border-b-0">
                  {/* Product Info */}
                  <div className="md:col-span-5 flex items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-gray-600 text-sm">Image</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      {!item.inStock && (
                        <span className="inline-block mt-1 text-sm text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex items-center">
                    <span className="text-gray-900 font-semibold">${item.price}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3 flex items-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-gray-900 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex items-center justify-between">
                    <span className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200">
                  Proceed to Checkout
                </button>

                <Link
                  href="/shop"
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 block text-center"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-300 transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">Secure Payment</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">Fast Delivery</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}