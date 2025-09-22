'use client';

import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-indigo max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using our shopping platform, you accept and agree to be bound by the terms and conditions outlined herein. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              To access certain features of our platform, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information during registration</li>
              <li>Promptly updating your information to keep it current</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Product Information</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide accurate product descriptions, prices, and availability information. However, we do not warrant that product descriptions, prices, or other content on our platform are accurate, complete, reliable, current, or error-free.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Orders and Payments</h2>
            <p className="text-gray-600 mb-4">
              All orders are subject to product availability and acceptance. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice. Payment must be received before order processing.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Shipping and Delivery</h2>
            <p className="text-gray-600 mb-4">
              Shipping times and costs vary based on your location and the shipping method selected. We are not responsible for delays caused by shipping carriers or unforeseen circumstances beyond our control.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Returns and Refunds</h2>
            <p className="text-gray-600 mb-4">
              Our return policy allows for returns within 30 days of purchase. Products must be in original condition with all tags attached. Refunds will be processed to the original payment method within 7-10 business days.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on this platform, including text, graphics, logos, and images, is our property or the property of our licensors and is protected by intellectual property laws. You may not use any content without our express written permission.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. User Conduct</h2>
            <p className="text-gray-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Use the platform for any illegal purpose</li>
              <li>Post or transmit harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper working of the platform</li>
              <li>Use automated systems to access the platform</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services, even if we have been advised of the possibility of such damages.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our platform. Your continued use of our services constitutes acceptance of the modified terms.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: support@shoppingplatform.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Shopping Street, Commerce City, CC 12345
            </p>
          </div>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500">
              By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}