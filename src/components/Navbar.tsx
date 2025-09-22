"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Product } from "@/types";
export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [email, setUserEmail] = useState("guest@gmail.com");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #12345 has been shipped",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Special Offer",
      message: "Get 20% off on electronics this weekend",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "Welcome to PremiumShop",
      message: "Thank you for creating an account with us",
      time: "1 day ago",
      read: true,
    },
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Mock product data for search
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 999,
      href: "/product/iphone-15-pro",
    },
    {
      id: 2,
      name: "MacBook Air",
      category: "Electronics",
      price: 1299,
      href: "/product/macbook-air",
    },
    {
      id: 3,
      name: "Nike Air Max",
      category: "Fashion",
      price: 120,
      href: "/product/nike-air-max",
    },
    {
      id: 4,
      name: "Samsung TV",
      category: "Electronics",
      price: 799,
      href: "/product/samsung-tv",
    },
    {
      id: 5,
      name: "Leather Jacket",
      category: "Fashion",
      price: 299,
      href: "/product/leather-jacket",
    },
    {
      id: 6,
      name: "Coffee Table",
      category: "Home",
      price: 450,
      href: "/product/coffee-table",
    },
  ];

  const isActive = (path: string) => pathname === path;

  // Check if user is logged in on component mount
  useEffect(() => {
    // In a real app, you would check for a token in cookies/localStorage
    // or make an API call to verify authentication status
    if (status === "authenticated") {
      setIsLoggedIn(true);
      const email = session?.user.email;
      setUserEmail(email);
    }

    if (status === "unauthenticated") {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, status]);

  // Handle click outside to close search, user menu, and notification menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Search functionality
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);

    signOut({
      callbackUrl: "/", // redirect after logout
    });
  };

  // Handle notification click
  const handleNotificationClick = (id: number) => {
    // Mark notification as read
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    // In a real app, you would navigate to the relevant page
    // For example, if it's an order notification, go to order details
    setNotificationMenuOpen(false);
  };

  // Get unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

  console.log("isLoggedIn", isLoggedIn);
  console.log("status is", status);

  console.log("session email is");
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PS</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                PremiumShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="p-4 border-b border-gray-200"
                  >
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Search Results */}
                  {searchQuery.length >= 2 && (
                    <div className="max-h-96 overflow-y-auto">
                      {isLoading ? (
                        <div className="p-4 text-center text-gray-500">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                          <p className="mt-2">Searching...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div>
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={product.href}
                              className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              onClick={clearSearch}
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {product.category}
                                </p>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <p className="text-sm font-medium text-indigo-600">
                                  ${product.price}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <div className="p-4 border-t border-gray-200">
                            <button
                              type="submit"
                              onClick={handleSearchSubmit}
                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                            >
                              View all results for &quot;{searchQuery}&quot;
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <p>No products found for &quot;{searchQuery}&quot;</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Popular Searches */}
                  {searchQuery.length === 0 && (
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Popular Searches
                      </h3>
                      <div className="space-y-2">
                        {[
                          "iPhone",
                          "Laptop",
                          "Shoes",
                          "Furniture",
                          "Watch",
                        ].map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="block w-full text-left text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 p-2 rounded"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                        onClick={() => {
                          // Mark all as read
                          setNotifications(
                            notifications.map((n) => ({ ...n, read: true }))
                          );
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                          onClick={() =>
                            handleNotificationClick(notification.id)
                          }
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <Link
                      href="/notifications"
                      className="block text-center text-sm text-indigo-600 hover:text-indigo-800"
                      onClick={() => setNotificationMenuOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              {isLoggedIn ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="hidden md:block text-sm text-gray-700 hover:text-indigo-600 px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="hidden md:block bg-indigo-600 text-white text-sm px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/login"
                    className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>
                </div>
              )}

              {/* User Dropdown Menu */}
              {userMenuOpen && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome back!
                    </p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Mobile auth links */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Orders
                    </Link>
                    <Link
                      href="/notifications"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 inline-flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/auth/login"
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-indigo-700 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-center font-medium hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
