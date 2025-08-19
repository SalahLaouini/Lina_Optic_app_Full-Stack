import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi'; // 📦 RTK Query to fetch all orders

// 🧩 Register chart.js components for rendering the bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  // 📡 Fetch all orders using RTK Query
  const { data: orders, error, isLoading } = useGetAllOrdersQuery();

  // 📊 Local state to store computed monthly revenue data
  const [revenueData, setRevenueData] = useState([]);

  // 📅 Helper function to extract the month from an order's creation date
  const getMonth = (date) => {
    const newDate = new Date(date);
    return newDate.getMonth(); // Returns values 0 (January) to 11 (December)
  };

  // 💰 Calculate total revenue for each month from the fetched orders
  const calculateRevenue = () => {
    const monthlyRevenue = Array(12).fill(0); // Initialize 12 months with 0 revenue

    if (orders) {
      orders.forEach((order) => {
        const month = getMonth(order.createdAt);
        monthlyRevenue[month] += order.totalPrice;
      });
    }

    setRevenueData(monthlyRevenue); // Store the result in local state
  };

  // ⏳ Run revenue calculation once orders are fetched
  useEffect(() => {
    if (orders) {
      calculateRevenue();
    }
  }, [orders]);

  // 🌀 Show loading message while orders are being fetched
  if (isLoading) return <p>Loading revenue data...</p>;

  // ❌ Show error message if data fetching fails
  if (error) return <p>Error fetching orders: {error.message}</p>;

  // 📈 Bar chart configuration (data & appearance)
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Revenue (TND)',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // 🟩 Fill color
        borderColor: 'rgba(34, 197, 94, 1)',       // 🟢 Border color
        borderWidth: 1,
      },
    ],
  };

  // ⚙️ Bar chart options and behavior
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Allows responsiveness on mobile
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue (TND)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 🧾 Render the chart
  return (
    <div className="revenue-chart-wrapper">
      <h2 className="chart-title">Monthly Revenue (TND)</h2>

      <div className="revenue-chart-scroll">
        <div className="chart-inner">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
