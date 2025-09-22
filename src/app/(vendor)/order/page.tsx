'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getStatusText, getStatusColor } from '@/handler';
import NoOrders from '@/components/orderComponents/noOrders.component';
import Support from '@/components/orderComponents/support.component';
export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { name: 'iPhone 15 Pro', price: 999, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'AirPods Pro', price: 249, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      total: 1248,
      trackingNumber: 'TRK123456789',
      deliveryDate: '2024-01-18',
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      items: [
        { name: 'MacBook Air M2', price: 1299, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Leather Sleeve', price: 149, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      total: 1448,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-20',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      items: [
        { name: 'Nike Air Max', price: 120, quantity: 2, image: '/api/placeholder/60/60' },
        { name: 'Sports Socks', price: 25, quantity: 3, image: '/api/placeholder/60/60' }
      ],
      total: 315,
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD-004',
      date: '2023-12-28',
      status: 'cancelled',
      items: [
        { name: 'Coffee Table', price: 450, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      total: 450,
      paymentMethod: 'Debit Card'
    }
  ];

  const filteredOrders = orders.filter(order => 
    activeTab === 'all' || order.status === activeTab
  );

  
  if (orders.length === 0) {
    <NoOrders/>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">View and manage your order history</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex space-x-4 overflow-x-auto">
            {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getStatusText(tab)} {tab === 'all' ? `(${orders.length})` : `(${orders.filter(o => o.status === tab).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <span className="text-lg font-bold text-gray-900">₹{order.total}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-gray-600 text-xs">Image</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-gray-900 font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-600">
                    Paid with {order.paymentMethod}
                    {order.trackingNumber && (
                      <div className="mt-1">
                        Tracking: <span className="font-medium">{order.trackingNumber}</span>
                      </div>
                    )}
                    {order.deliveryDate && (
                      <div className="mt-1">
                        Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                      </div>
                    )}
                    {order.estimatedDelivery && (
                      <div className="mt-1">
                        Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                        Buy Again
                      </button>
                    )}
                    
                    {order.status === 'processing' && (
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Filter */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">No {getStatusText(activeTab).toLowerCase()} orders</h2>
            <p className="text-gray-600 mb-6">
              You don&#39;t have any {getStatusText(activeTab).toLowerCase()} orders at the moment.
            </p>
            <Link
              href="/shop"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Pagination (would be implemented with actual pagination) */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Support Section */}
        <Support/>
      </div>
    </div>
  );
}