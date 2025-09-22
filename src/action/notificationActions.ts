// app/actions/notificationActions.ts
"use server";

import { revalidatePath } from "next/cache";

// Mock notification data - in a real app, this would come from a database
let notifications = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order #12345 has been shipped",
    time: "2 hours ago",
    read: false,
    userId: "user-123",
  },
  {
    id: 2,
    title: "Special Offer",
    message: "Get 20% off on electronics this weekend",
    time: "5 hours ago",
    read: true,
    userId: "user-123",
  },
  {
    id: 3,
    title: "Welcome to PremiumShop",
    message: "Thank you for creating an account with us",
    time: "1 day ago",
    read: true,
    userId: "user-123",
  },
];

export async function getNotifications(userId: string) {
  return notifications.filter(notification => notification.userId === userId);
}

export async function markNotificationAsRead(notificationId: number) {
  // In a real app, you would update the notification in the database
  notifications = notifications.map(notification => 
    notification.id === notificationId 
      ? { ...notification, read: true } 
      : notification
  );
  
  revalidatePath("/");
  return { success: true };
}

export async function markAllNotificationsAsRead(userId: string) {
  // In a real app, you would update all notifications for this user in the database
  notifications = notifications.map(notification => 
    notification.userId === userId && !notification.read
      ? { ...notification, read: true } 
      : notification
  );
  
  revalidatePath("/");
  return { success: true };
}