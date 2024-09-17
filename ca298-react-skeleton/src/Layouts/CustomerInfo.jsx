import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CustomerInfo() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/customer/');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Failed to fetch customers. Please try again later.');
      }
    };

    fetchCustomers();
  }, []);

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/customer/${customerId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }
      const customerData = await response.json();
      setSelectedCustomer(customerData);
  
      // Fetch customer orders
      const ordersResponse = await fetch(`http://127.0.0.1:8000/api/order/?customer=${customerId}`);
      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch customer orders');
      }
      const ordersData = await ordersResponse.json();
  
      setCustomerOrders(ordersData);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setError('Failed to fetch customer details. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Customer Information</h2>
      {error && <p>{error}</p>}
      <div>
        <h3>All Customers:</h3>
        <ul>
          {customers.map((customer) => (
            <li key={customer.url}>
              <button onClick={() => fetchCustomerDetails(customer.url.split('/').slice(-2, -1)[0])}>
                {customer.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedCustomer && (
        <div>
          <h3>Customer Details:</h3>
          <p>ID: {selectedCustomer.url.split('/').slice(-2, -1)[0]}</p>
          <p>Name: {selectedCustomer.name}</p>
          <p>Email: {selectedCustomer.email}</p>
          <p>Address: {selectedCustomer.address}</p>
          <h3>Orders:</h3>
          <ul>
            {customerOrders.map((order, index) => (
              <li key={order.url.split('/').slice(-2, -1)[0]}>
                <Link to={`/orderinfo/${order.url.split('/').slice(-2, -1)[0]}`}>Order: {index + 1}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerInfo;
