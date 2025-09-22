// app/(vendor)/order/[orderId]/page.tsx
import { Metadata } from "next";
import { generateOrderId } from "@/lib/nanoId";
// Define TypeScript interfaces for our data
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  customer: string;
  address: string;
  status: "processing" | "intransit" | "delivered" | "cancelled";
  deliveredDate?: string;
  cancelledDate?: string;
}
type Props = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order Status - ${orderId}`,
    description: `Check the status of your order ${orderId}`,
  };
}
// Simulate fetching order data (replace with your actual data fetching)
async function getOrderData(orderId: string): Promise<OrderData | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Determine status based on orderId
  const statusIndex = 0;
  let status: OrderData["status"] = "processing";
  let deliveredDate: string | undefined;
  let cancelledDate: string | undefined;

  switch (statusIndex) {
    case 0:
      status = "delivered";
      deliveredDate = "2023-10-20";
      break;
    case 1:
      status = "intransit";
      break;
    case 2:
      status = "cancelled";
      cancelledDate = "2023-10-18";
      break;
    case 3:
      status = "processing";
      break;
  }

  // Mock data based on orderId
  return {
    id: orderId,
    date: "2023-10-15",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 89.99 },
      { name: "Phone Case", quantity: 2, price: 15.99 },
    ],
    total: 121.97,
    customer: "John Doe",
    address: "123 Main St, Anytown, AN 12345",
    status, // Use the status variable, not hardcoded "cancelled"
    deliveredDate,
    cancelledDate,
  };
}

const OrderStatusPage = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = await params;
  const order = await getOrderData(orderId);

  const orderIdV2 = generateOrderId();
  console.log("order id is", orderIdV2)

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-10 text-xl text-red-500">
          Order not found
        </div>
      </div>
    );
  }

  const getStatusInfo = (status: OrderData["status"]) => {
    switch (status) {
      case "processing":
        return {
          text: "Processing",
          description: "Your order is being prepared for shipment.",
          icon: "⏳",
          color: "bg-amber-500",
        };
      case "intransit":
        return {
          text: "In Transit",
          description: "Your order is on the way to you.",
          icon: "🚚",
          color: "bg-blue-500",
        };
      case "delivered":
        return {
          text: "Delivered",
          description: "Your order has been delivered.",
          icon: "✅",
          color: "bg-green-500",
        };
      case "cancelled":
        return {
          text: "Cancelled",
          description: "Your order has been cancelled.",
          icon: "❌",
          color: "bg-red-500",
        };
      default:
        return {
          text: "Unknown",
          description: "Status information not available.",
          icon: "❓",
          color: "bg-gray-500",
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Status</h1>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Order #{order.id}
          </h2>
          <p className="text-gray-600">Placed on {order.date}</p>
        </div>

        <div className="px-6 py-5 border-b border-gray-200 text-center">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-white ${statusInfo.color}`}
          >
            <span className="mr-2 text-lg">{statusInfo.icon}</span>
            <span className="font-bold">{statusInfo.text}</span>
          </div>
          <p className="mt-3 text-gray-600">{statusInfo.description}</p>

          {/* Display delivered date if order is delivered */}
          {order.status === "delivered" && order.deliveredDate && (
            <p className="mt-2 text-gray-700 font-medium">
              Delivered on: {order.deliveredDate}
            </p>
          )}

          {/* Display cancelled date if order is cancelled */}
          {order.status === "cancelled" && order.cancelledDate && (
            <p className="mt-2 text-gray-700 font-medium">
              Cancelled on: {order.cancelledDate}
            </p>
          )}

          {/* Status Progress Bar - Only show for non-cancelled orders */}
          {order.status !== "cancelled" && (
            <div className="mt-6 mb-4">
              <div className="flex justify-between relative mx-auto max-w-2xl">
                {/* Progress line */}
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 z-0"></div>

                {/* Processing step */}
                <div className="relative z-10 text-center w-1/3">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full border-4 border-white ${
                      order.status === "processing" ||
                      order.status === "intransit" ||
                      order.status === "delivered"
                        ? "bg-green-500 shadow-inner"
                        : "bg-gray-200"
                    } shadow-md`}
                  ></div>
                  <span
                    className={`block mt-2 text-sm ${
                      order.status === "processing" ||
                      order.status === "intransit" ||
                      order.status === "delivered"
                        ? "text-green-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Processing
                  </span>
                </div>

                {/* In Transit step */}
                <div className="relative z-10 text-center w-1/3">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full border-4 border-white ${
                      order.status === "intransit" ||
                      order.status === "delivered"
                        ? "bg-green-500 shadow-inner"
                        : "bg-gray-200"
                    } shadow-md`}
                  ></div>
                  <span
                    className={`block mt-2 text-sm ${
                      order.status === "intransit" ||
                      order.status === "delivered"
                        ? "text-green-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    In Transit
                  </span>
                </div>

                {/* Delivered step */}
                <div className="relative z-10 text-center w-1/3">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full border-4 border-white ${
                      order.status === "delivered"
                        ? "bg-green-500 shadow-inner"
                        : "bg-gray-200"
                    } shadow-md`}
                  ></div>
                  <span
                    className={`block mt-2 text-sm ${
                      order.status === "delivered"
                        ? "text-green-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Delivered
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-5">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Items</h3>
            <ul className="divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <li key={index} className="py-3 flex justify-between">
                  <span className="text-gray-700">
                    {item.quantity} x {item.name}
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Shipping Address
            </h3>
            <p className="text-gray-700">{order.customer}</p>
            <p className="text-gray-700">{order.address}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Payment Information
            </h3>
            <p className="text-gray-700">
              Total: <strong>${order.total.toFixed(2)}</strong>
            </p>
            <p className="text-gray-700">
              Payment Method: Credit Card ending in ****1234
            </p>
            <p className="text-gray-700">
              Payment Status:{" "}
              {order.status === "cancelled" ? "Refunded" : "Paid"}
            </p>
            {order.status === "cancelled" && order.cancelledDate && (
              <p className="text-gray-700 mt-2">
                Refund issued on: {order.cancelledDate}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p>
          Need help with your order?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderStatusPage;
