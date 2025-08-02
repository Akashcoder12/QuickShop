import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../api/BookingApi';
import { useNavigate } from 'react-router-dom';

export default function UserPanel() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-3xl font-semibold mb-6'>User Dashboard</h2>

      {/* Profile Info (optional) */}
      {/* <div>
        <p><strong>Name:</strong> {user?.name || "Guest"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div> */}

      {/* Navigation */}
      <div className='bg-white shadow p-4 mb-6 rounded border space-x-4'>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded'
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded'
          onClick={() => navigate('/orders')}
        >
          View All Orders
        </button>
      </div>

      {/* Recent Orders Preview */}
      <div className='bg-white shadow p-4 rounded border'>
        <h3 className='text-xl font-semibold mb-4'>Recent Orders</h3>

        {orders && orders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <ul className='space-y-3'>
            {orders.slice(0, 3).map((order) => (
              <li key={order._id} className='border p-3 rounded'>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p className='text-sm text-gray-500'>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
