"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Transaction type definition
type Transaction = {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  paymentMethod: "credit_card" | "paypal" | "stripe" | "apple_pay";
  items: number;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | Transaction["status"]>("all");
  const [paymentFilter, setPaymentFilter] = useState<"all" | Transaction["paymentMethod"]>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'ascending' | 'descending' } | null>(null);

  // Sample transactions data
  const sampleTransactions: Transaction[] = [
    {
      id: 1,
      orderId: "ORD-12345",
      customer: "John Doe",
      date: "2023-10-15",
      amount: 149.99,
      status: "completed",
      paymentMethod: "credit_card",
      items: 3
    },
    {
      id: 2,
      orderId: "ORD-12346",
      customer: "Jane Smith",
      date: "2023-10-15",
      amount: 89.50,
      status: "pending",
      paymentMethod: "paypal",
      items: 2
    },
    {
      id: 3,
      orderId: "ORD-12347",
      customer: "Robert Johnson",
      date: "2023-10-14",
      amount: 234.95,
      status: "completed",
      paymentMethod: "stripe",
      items: 5
    },
    {
      id: 4,
      orderId: "ORD-12348",
      customer: "Emily Davis",
      date: "2023-10-14",
      amount: 59.99,
      status: "failed",
      paymentMethod: "credit_card",
      items: 1
    },
    {
      id: 5,
      orderId: "ORD-12349",
      customer: "Michael Wilson",
      date: "2023-10-13",
      amount: 199.99,
      status: "refunded",
      paymentMethod: "apple_pay",
      items: 2
    },
    {
      id: 6,
      orderId: "ORD-12350",
      customer: "Sarah Brown",
      date: "2023-10-13",
      amount: 74.25,
      status: "completed",
      paymentMethod: "credit_card",
      items: 4
    },
    {
      id: 7,
      orderId: "ORD-12351",
      customer: "David Miller",
      date: "2023-10-12",
      amount: 299.99,
      status: "completed",
      paymentMethod: "stripe",
      items: 1
    },
    {
      id: 8,
      orderId: "ORD-12352",
      customer: "Lisa Taylor",
      date: "2023-10-12",
      amount: 124.50,
      status: "pending",
      paymentMethod: "paypal",
      items: 3
    },
    {
      id: 9,
      orderId: "ORD-12353",
      customer: "James Anderson",
      date: "2023-10-11",
      amount: 49.99,
      status: "completed",
      paymentMethod: "credit_card",
      items: 2
    },
    {
      id: 10,
      orderId: "ORD-12354",
      customer: "Karen Thomas",
      date: "2023-10-11",
      amount: 179.99,
      status: "refunded",
      paymentMethod: "apple_pay",
      items: 1
    },
    {
      id: 11,
      orderId: "ORD-12355",
      customer: "William Jackson",
      date: "2023-10-10",
      amount: 99.99,
      status: "completed",
      paymentMethod: "stripe",
      items: 3
    },
    {
      id: 12,
      orderId: "ORD-12356",
      customer: "Jennifer White",
      date: "2023-10-10",
      amount: 209.50,
      status: "pending",
      paymentMethod: "credit_card",
      items: 5
    }
  ];

  // Load transactions on component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions(sampleTransactions);
      setFilteredTransactions(sampleTransactions);
      setIsLoading(false);
    }, 800);
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = transactions;
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(transaction => transaction.status === statusFilter);
    }
    
    // Apply payment method filter
    if (paymentFilter !== "all") {
      result = result.filter(transaction => transaction.paymentMethod === paymentFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
      result = result.filter(transaction => transaction.date === dateFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(transaction => 
        transaction.orderId.toLowerCase().includes(query) ||
        transaction.customer.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortConfig !== null) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredTransactions(result);
  }, [transactions, statusFilter, paymentFilter, dateFilter, searchQuery, sortConfig]);

  // Handle sorting
  const requestSort = (key: keyof Transaction) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get status badge class
  const getStatusBadgeClass = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get payment method text
  const getPaymentMethodText = (method: Transaction["paymentMethod"]) => {
    switch (method) {
      case "credit_card":
        return "Credit Card";
      case "paypal":
        return "PayPal";
      case "stripe":
        return "Stripe";
      case "apple_pay":
        return "Apple Pay";
      default:
        return method;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Calculate totals
  const totalRevenue = filteredTransactions
    .filter(t => t.status === "completed")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const pendingAmount = filteredTransactions
    .filter(t => t.status === "pending")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and review all transactions
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Transactions</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(pendingAmount)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Transactions</p>
              <p className="text-xl font-semibold text-gray-900">{filteredTransactions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Methods</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="apple_pay">Apple Pay</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            // Loading state
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            // Empty state
            <div className="p-8 text-center">
              <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions found</h3>
              <p className="text-gray-500 mb-4">
                {statusFilter !== "all" || paymentFilter !== "all" || dateFilter || searchQuery
                  ? "No transactions match your current filters."
                  : "There are no transactions yet."}
              </p>
              {(statusFilter !== "all" || paymentFilter !== "all" || dateFilter || searchQuery) && (
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setPaymentFilter("all");
                    setDateFilter("");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            // Transactions table
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('orderId')}
                    >
                      Order ID
                      {sortConfig?.key === 'orderId' && (
                        <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('customer')}
                    >
                      Customer
                      {sortConfig?.key === 'customer' && (
                        <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('date')}
                    >
                      Date
                      {sortConfig?.key === 'date' && (
                        <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('amount')}
                    >
                      Amount
                      {sortConfig?.key === 'amount' && (
                        <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</div>
                        <div className="text-xs text-gray-500">{transaction.items} items</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{getPaymentMethodText(transaction.paymentMethod)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button className="text-red-600 hover:text-red-900">Refund</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{filteredTransactions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}