// src/components/OrderTabs.js

import React, { useState } from 'react';
import { orders } from '../data/orders';

const ITEMS_PER_PAGE = 5;

const OrderTabs = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter orders based on the selected tab
  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    return order.delivery === selectedTab;
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  // Get the current page's orders
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle tab selection
  const handleTabSelect = tab => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  // Handle page navigation
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={selectedTab === 'all' ? 'active' : ''}
          onClick={() => handleTabSelect('all')}
        >
          All Orders
        </button>
        <button
          className={selectedTab === 'regular' ? 'active' : ''}
          onClick={() => handleTabSelect('regular')}
        >
          Regular Delivery
        </button>
        <button
          className={selectedTab === 'express' ? 'active' : ''}
          onClick={() => handleTabSelect('express')}
        >
          Express Delivery
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delivery</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.delivery}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;
