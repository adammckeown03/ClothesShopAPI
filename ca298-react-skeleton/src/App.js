import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Layouts/Home';
import FourOhFour from './Layouts/FourOhFour';
import CategoryProducts from './Layouts/CategoryProducts';
import OrdersByStatus from './Layouts/OrderByStatus';
import CustomerInfo from './Layouts/CustomerInfo';
import OrderInfo from './Layouts/OrderInfo';
import Navbar from './Layouts/Navbar';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="ordersbystatus" element={<OrdersByStatus />} />
            <Route path="categoryproducts" element={<CategoryProducts />} />
            <Route path="customerinfo" element={<CustomerInfo />} />
            <Route path="orderinfo/:orderId" element={<OrderInfo />} />
            <Route path="*" element={<FourOhFour />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
