import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OrderInfo() {
  const { orderId } = useParams(); // Extracting the orderId from the URL

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Fetch order details
      const orderResponse = await fetch(`http://127.0.0.1:8000/api/order/${orderId}/`);
      const orderData = await orderResponse.json();
      setOrder(orderData);

      // Fetch order items
      const orderItemsResponse = await fetch(`http://127.0.0.1:8000/api/orderitem/?order=${orderId}`);
      const orderItemsData = await orderItemsResponse.json();
      setOrderItems(orderItemsData);
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const updatedOrderItems = [];
      for (const orderItem of orderItems) {
        const productResponse = await fetch(orderItem.product);
        const productData = await productResponse.json();
        updatedOrderItems.push({
          ...orderItem,
          product: productData,
        });
      }
      setOrderItems(updatedOrderItems);
  
      // Calculate total price
      const totalPrice = updatedOrderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setTotalPrice(totalPrice);
    };

    if (orderItems.length > 0) {
      fetchProductDetails();
    }
  }, [orderItems]);

  return (
    <div>
      <h2>Order Information</h2>
      {order && (
        <div>
          <h3>Order Details:</h3>
          <p>Order ID: {orderId}</p>
          <p>Date Ordered: {order.date_ordered.split('T')[0]}</p>
          <p>Shipping Address: {order.shipping_addr}</p>
          <p>Status: {order.status}</p>
          <h3>Products Ordered:</h3>
          <ul>
            {orderItems.map((item) => (
              <li key={item.id}>
                <p>Product: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: €{item.product.price}</p>
              </li>
            ))}
          </ul>
          <h3>Total Price: €{totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default OrderInfo;
