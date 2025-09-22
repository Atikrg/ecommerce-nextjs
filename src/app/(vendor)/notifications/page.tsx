"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Notification type definition
type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  type: "order" | "promotion" | "system" | "account";
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | Notification["type"]>("all");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Sample notifications data
  const sampleNotifications: Notification[] = [
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #12345 has been shipped. Track your package to see delivery status.",
      time: "2:30 PM",
      date: "Oct 15, 2023",
      read: false,
      type: "order"
    },
    {
      id: 2,
      title: "Special Offer",
      message: "Get 20% off on electronics this weekend. Use code: ELECTRO20",
      time: "10:15 AM",
      date: "Oct 14, 2023",
      read: true,
      type: "promotion"
    },
    {
      id: 3,
      title: "Welcome to PremiumShop",
      message: "Thank you for creating an account with us. Enjoy your shopping!",
      time: "4:45 PM",
      date: "Oct 13, 2023",
      read: true,
      type: "account"
    },
    {
      id: 4,
      title: "Order Delivered",
      message: "Your order #12345 has been delivered. We hope you enjoy your purchase!",
      time: "11:20 AM",
      date: "Oct 13, 2023",
      read: false,
      type: "order"
    },
    {
      id: 5,
      title: "System Maintenance",
      message: "We'll be performing scheduled maintenance on Sunday from 2AM to 4AM EST.",
      time: "3:15 PM",
      date: "Oct 12, 2023",
      read: true,
      type: "system"
    },
    {
      id: 6,
      title: "Flash Sale Live",
      message: "Flash sale on home appliances is live now. Up to 40% off for next 2 hours!",
      time: "1:05 PM",
      date: "Oct 11, 2023",
      read: false,
      type: "promotion"
    },
    {
      id: 7,
      title: "Password Changed",
      message: "Your account password was successfully changed. Contact support if this wasn't you.",
      time: "9:30 AM",
      date: "Oct 10, 2023",
      read: true,
      type: "account"
    },
    {
      id: 8,
      title: "Order Confirmed",
      message: "Your order #67890 has been confirmed and is being processed.",
      time: "5:40 PM",
      date: "Oct 9, 2023",
      read: false,
      type: "order"
    }
  ];

  // Load notifications on component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter notifications based on selected filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesStatus = filter === "all" || 
                          (filter === "unread" && !notification.read) || 
                          (filter === "read" && notification.read);
    
    const matchesType = typeFilter === "all" || notification.type === typeFilter;
    
    return matchesStatus && matchesType;
  });

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Delete a notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get notification icon based on type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return (
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case "promotion":
        return (
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        );
      case "system":
        return (
          <div className="p-2 rounded-full bg-purple-100 text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      case "account":
        return (
          <div className="p-2 rounded-full bg-amber-100 text-amber-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  // Format date for group headers
  const formatDateGroup = (dateString: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const date = new Date(dateString);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return dateString;
    }
  };

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={clearAllNotifications}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${filter === "all" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${filter === "unread" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${filter === "read" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Read
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${typeFilter === "all" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                All Types
              </button>
              <button
                onClick={() => setTypeFilter("order")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${typeFilter === "order" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Orders
              </button>
              <button
                onClick={() => setTypeFilter("promotion")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${typeFilter === "promotion" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Promotions
              </button>
              <button
                onClick={() => setTypeFilter("system")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${typeFilter === "system" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                System
              </button>
              <button
                onClick={() => setTypeFilter("account")}
                className={`px-3 py-1 text-sm font-medium rounded-full ${typeFilter === "account" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Account
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            // Loading state
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading your notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            // Empty state
            <div className="p-8 text-center">
              <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-500 mb-4">
                {filter === "all" && typeFilter === "all" 
                  ? "You're all caught up! Check back later for new notifications." 
                  : "No notifications match your current filters."}
              </p>
              {(filter !== "all" || typeFilter !== "all") && (
                <button
                  onClick={() => { setFilter("all"); setTypeFilter("all"); }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            // Notifications list
            <div className="divide-y divide-gray-200">
              {Object.entries(groupedNotifications).map(([date, notifications]) => (
                <div key={date}>
                  <div className="bg-gray-50 px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-700">{formatDateGroup(date)}</h3>
                  </div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-4 flex items-start hover:bg-gray-50 transition-colors duration-150 ${
                        !notification.read ? "bg-blue-50 hover:bg-blue-100" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-indigo-600 hover:text-indigo-800"
                            title="Mark as read"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-gray-400 hover:text-red-500"
                          title="Delete notification"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}