import React, { useState, useEffect } from 'react';

function OrdersByStatus() {
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([]);
  const [customerNames, setCustomerNames] = useState({});

  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/order/?status=${status}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        fetchCustomerNames(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrdersByStatus();
  }, [status]);

  const fetchCustomerNames = async (ordersData) => {
    const names = { ...customerNames };
    for (const order of ordersData) {
      const customerId = order.customer.split('/').slice(-2, -1)[0];
      if (!names[customerId]) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/customer/${customerId}/`);
          if (!response.ok) {
            throw new Error(`Failed to fetch customer with ID ${customerId}`);
          }
          const data = await response.json();
          names[customerId] = data.name;
        } catch (error) {
          console.error(`Error fetching customer with ID ${customerId}:`, error);
          names[customerId] = 'Unknown';
        }
      }
    }
    setCustomerNames(names);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div>
      <h2>View Orders by Status</h2>
      <div>
        <button onClick={() => handleStatusChange('O')}>Ordered</button>
        <button onClick={() => handleStatusChange('P')}>Processing</button>
        <button onClick={() => handleStatusChange('S')}>Shipped</button>
        <button onClick={() => handleStatusChange('D')}>Delivered</button>
      </div>
      {status && (
        <div>
          <h3>Orders with status: {status}</h3>
          <ul>
            {orders.map((order) => {
              const orderId = order.url.split('/').slice(-2, -1)[0]; // Extracting order ID from URL
              const dateOrdered = order.date_ordered.slice(0, 10); // Slicing to get YYYY-MM-DD format
              const customerId = order.customer.split('/').slice(-2, -1)[0]; // Extracting customer ID from URL
              const customerName = customerNames[customerId] || 'Unknown';
              return (
                <li key={orderId}>
                  <p>Order ID: {orderId}</p>
                  <p>Date Ordered: {dateOrdered}</p>
                  <p>Shipping Address: {order.shipping_addr}</p>
                  <p>Customer: {customerName}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrdersByStatus;
