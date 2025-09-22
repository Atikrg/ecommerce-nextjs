'use client';

import { useState } from 'react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' }
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      category: 'electronics',
      rating: 4.8,
      image: '/api/placeholder/300/300',
      description: 'Latest Apple smartphone with advanced camera features',
      featured: true
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      price: 1299,
      category: 'electronics',
      rating: 4.9,
      image: '/api/placeholder/300/300',
      description: 'Ultra-thin laptop with powerful M2 chip',
      featured: true
    },
    {
      id: 3,
      name: 'Nike Air Max',
      price: 120,
      category: 'fashion',
      rating: 4.5,
      image: '/api/placeholder/300/300',
      description: 'Comfortable running shoes with air cushioning',
      featured: false
    },
    {
      id: 4,
      name: 'Leather Jacket',
      price: 299,
      category: 'fashion',
      rating: 4.7,
      image: '/api/placeholder/300/300',
      description: 'Premium genuine leather jacket',
      featured: true
    },
    {
      id: 5,
      name: 'Coffee Table',
      price: 450,
      category: 'home',
      rating: 4.6,
      image: '/api/placeholder/300/300',
      description: 'Modern wooden coffee table with storage',
      featured: false
    },
    {
      id: 6,
      name: 'Skincare Set',
      price: 89,
      category: 'beauty',
      rating: 4.4,
      image: '/api/placeholder/300/300',
      description: 'Complete daily skincare routine set',
      featured: false
    },
    {
      id: 7,
      name: 'Yoga Mat',
      price: 65,
      category: 'sports',
      rating: 4.3,
      image: '/api/placeholder/300/300',
      description: 'Eco-friendly non-slip yoga mat',
      featured: false
    },
    {
      id: 8,
      name: 'Smart Watch',
      price: 349,
      category: 'electronics',
      rating: 4.7,
      image: '/api/placeholder/300/300',
      description: 'Fitness tracker with heart rate monitor',
      featured: true
    }
  ];

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const addToCart = (product: any) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="mt-2 text-gray-600">Discover our premium collection of products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-600 text-sm">Product Image</div>
                </div>
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category or search term.</p>
          </div>
        )}

        {/* Load More (Pagination would go here) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Every product is carefully selected for superior quality and durability</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50. Delivery within 2-3 business days</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy. No questions asked returns for all products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}