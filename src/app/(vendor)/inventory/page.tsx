"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// Inventory item type definition
type InventoryItem = {
  id: number;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  cost: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastUpdated: string;
  supplier: string;
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | InventoryItem["status"]
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample inventory data
  const sampleInventory: InventoryItem[] = [
    {
      id: 1,
      sku: "ELEC-001",
      name: "Wireless Headphones",
      category: "Electronics",
      quantity: 45,
      price: 79.99,
      cost: 45.5,
      status: "in_stock",
      lastUpdated: "2023-10-15",
      supplier: "TechSupplies Inc.",
    },
    {
      id: 2,
      sku: "ELEC-002",
      name: "Bluetooth Speaker",
      category: "Electronics",
      quantity: 12,
      price: 59.99,
      cost: 32.75,
      status: "low_stock",
      lastUpdated: "2023-10-14",
      supplier: "AudioTech Ltd.",
    },
    {
      id: 3,
      sku: "CLOTH-001",
      name: "Cotton T-Shirt",
      category: "Clothing",
      quantity: 0,
      price: 19.99,
      cost: 8.5,
      status: "out_of_stock",
      lastUpdated: "2023-10-13",
      supplier: "FashionWorks Co.",
    },
    {
      id: 4,
      sku: "CLOTH-002",
      name: "Denim Jeans",
      category: "Clothing",
      quantity: 28,
      price: 49.99,
      cost: 22.3,
      status: "in_stock",
      lastUpdated: "2023-10-12",
      supplier: "FashionWorks Co.",
    },
    {
      id: 5,
      sku: "HOME-001",
      name: "Coffee Maker",
      category: "Home & Kitchen",
      quantity: 15,
      price: 89.99,
      cost: 52.4,
      status: "in_stock",
      lastUpdated: "2023-10-11",
      supplier: "HomeEssentials Inc.",
    },
    {
      id: 6,
      sku: "HOME-002",
      name: "Blender",
      category: "Home & Kitchen",
      quantity: 7,
      price: 39.99,
      cost: 21.8,
      status: "low_stock",
      lastUpdated: "2023-10-10",
      supplier: "HomeEssentials Inc.",
    },
    {
      id: 7,
      sku: "SPT-001",
      name: "Yoga Mat",
      category: "Sports & Fitness",
      quantity: 32,
      price: 29.99,
      cost: 14.25,
      status: "in_stock",
      lastUpdated: "2023-10-09",
      supplier: "FitLife Products",
    },
    {
      id: 8,
      sku: "SPT-002",
      name: "Dumbbell Set",
      category: "Sports & Fitness",
      quantity: 3,
      price: 99.99,
      cost: 58.7,
      status: "low_stock",
      lastUpdated: "2023-10-08",
      supplier: "FitLife Products",
    },
    {
      id: 9,
      sku: "BEAU-001",
      name: "Face Moisturizer",
      category: "Beauty",
      quantity: 24,
      price: 24.99,
      cost: 11.4,
      status: "in_stock",
      lastUpdated: "2023-10-07",
      supplier: "BeautySupplies Co.",
    },
    {
      id: 10,
      sku: "BEAU-002",
      name: "Sunscreen Lotion",
      category: "Beauty",
      quantity: 0,
      price: 16.99,
      cost: 7.8,
      status: "out_of_stock",
      lastUpdated: "2023-10-06",
      supplier: "BeautySupplies Co.",
    },
  ];

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(sampleInventory.map((item) => item.category)),
  ];

  // Load inventory on component mount
  useState(() => {
    // Simulate API call
    setTimeout(() => {
      setInventory(sampleInventory);
      setFilteredInventory(sampleInventory);
      setIsLoading(false);
    }, 800);
  });

  // Apply filters whenever filter criteria change
  useState(() => {
    let result = inventory;

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.supplier.toLowerCase().includes(query)
      );
    }

    setFilteredInventory(result);
  });

  // Get status badge class
  const getStatusBadgeClass = (status: InventoryItem["status"]) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800";
      case "low_stock":
        return "bg-yellow-100 text-yellow-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate inventory value
  const inventoryValue = filteredInventory.reduce(
    (sum, item) => sum + item.quantity * item.cost,
    0
  );
  const inventoryRetailValue = filteredInventory.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Handle Excel upload
  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is Excel format
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setUploadMessage({
        type: "error",
        text: "Please upload an Excel file (.xlsx or .xls)",
      });
      return;
    }

    setIsUploading(true);
    setUploadMessage(null);

    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);

      // Simulate successful upload
      const newItems: InventoryItem[] = [
        {
          id: inventory.length + 1,
          sku: "OFF-001",
          name: "Desk Lamp",
          category: "Office",
          quantity: 18,
          price: 34.99,
          cost: 18.5,
          status: "in_stock",
          lastUpdated: "2023-10-16",
          supplier: "OfficeSupplies Co.",
        },
        {
          id: inventory.length + 2,
          sku: "OFF-002",
          name: "Stapler",
          category: "Office",
          quantity: 42,
          price: 12.99,
          cost: 5.25,
          status: "in_stock",
          lastUpdated: "2023-10-16",
          supplier: "OfficeSupplies Co.",
        },
      ];

      setInventory([...inventory, ...newItems]);
      setFilteredInventory([...inventory, ...newItems]);
      setUploadMessage({
        type: "success",
        text: "Inventory updated successfully with 2 new items!",
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2000);
  };

  // Download template function
  const downloadTemplate = () => {
    // Create a template link
    const templateLink = document.createElement("a");
    templateLink.href = "/inventory-template.xlsx"; // This would be a real file in your public folder
    templateLink.download = "inventory-template.xlsx";
    templateLink.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Inventory Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your product inventory and stock levels
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Add New Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-xl font-semibold text-gray-900">
                {filteredInventory.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Inventory Value
              </p>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrency(inventoryValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Retail Value</p>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrency(inventoryRetailValue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Excel Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Bulk Import Inventory
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Upload an Excel file to update your inventory in bulk
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={downloadTemplate}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Download Template
              </button>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleExcelUpload}
                  accept=".xlsx, .xls"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="excel-upload"
                />
                <label
                  htmlFor="excel-upload"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200 cursor-pointer block text-center"
                >
                  {isUploading ? "Uploading..." : "Upload Excel File"}
                </label>
              </div>
            </div>
          </div>

          {uploadMessage && (
            <div
              className={`mt-4 p-3 rounded-md ${
                uploadMessage.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {uploadMessage.text}
            </div>
          )}

          <div className="mt-4 text-xs text-gray-500">
            <p>Supported formats: .xlsx, .xls</p>
            <p>
              Template must include columns: SKU, Name, Category, Quantity,
              Price, Cost, Supplier
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name, SKU, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            // Loading state
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading inventory...</p>
            </div>
          ) : filteredInventory.length === 0 ? (
            // Empty state
            <div className="p-8 text-center">
              <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No inventory items found
              </h3>
              <p className="text-gray-500 mb-4">
                {statusFilter !== "all" ||
                categoryFilter !== "all" ||
                searchQuery
                  ? "No items match your current filters."
                  : "You haven't added any inventory items yet."}
              </p>
              <div className="flex justify-center gap-3">
                {(statusFilter !== "all" ||
                  categoryFilter !== "all" ||
                  searchQuery) && (
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setCategoryFilter("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Clear filters
                  </button>
                )}
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                  Add New Item
                </button>
              </div>
            </div>
          ) : (
            // Inventory table
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Supplier
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(item.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(item.cost)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                            item.status
                          )}`}
                        >
                          {item.status === "in_stock"
                            ? "In Stock"
                            : item.status === "low_stock"
                            ? "Low Stock"
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {item.supplier}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredInventory.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">
                    {filteredInventory.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
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
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
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
