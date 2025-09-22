'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/api/placeholder/100/100',
    joinDate: '2023-06-15'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Home Address',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Office Address',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ]);

  const stats = {
    totalOrders: 12,
    totalSpent: 4895.75,
    loyaltyPoints: 2450
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, you would save to backend here
    console.log('Profile saved:', profileData);
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{profileData.email}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Member since {new Date(profileData.joinDate).toLocaleDateString()}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile Information', icon: '👤' },
                  { id: 'addresses', label: 'Addresses', icon: '🏠' },
                  { id: 'orders', label: 'Order History', icon: '📦' },
                  { id: 'security', label: 'Security', icon: '🔒' },
                  { id: 'preferences', label: 'Preferences', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Account Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orders</span>
                    <span className="font-medium">{stats.totalOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-medium">${stats.totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Loyalty Points</span>
                    <span className="font-medium">{stats.loyaltyPoints}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 mt-8 lg:mt-0">
            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Addresses</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                    Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <h3 className="font-medium text-gray-900 mb-2">{address.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zipCode}<br />
                        {address.country}
                      </p>
                      <div className="flex space-x-2 mt-4">
                        {!address.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-indigo-600 text-sm hover:text-indigo-700"
                          >
                            Set Default
                          </button>
                        )}
                        <button className="text-gray-600 text-sm hover:text-gray-700">
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-red-600 text-sm hover:text-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order History */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-gray-600 mb-4">View your complete order history</p>
                  <Link
                    href="/orders"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center"
                  >
                    View All Orders
                  </Link>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Password</h3>
                      <p className="text-gray-600 text-sm">Last changed 3 months ago</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                      Change Password
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-gray-600 text-sm">Add an extra layer of security</p>
                    </div>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-gray-600 text-sm">Receive order updates and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-gray-600 text-sm">Receive text message updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}