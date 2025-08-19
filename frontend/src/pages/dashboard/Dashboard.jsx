import { FaBoxOpen, FaClipboardList, FaChartLine, FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../components/Loading'; // 🌀 Custom loading component
import getBaseUrl from '../../utils/baseURL'; // 🌐 Utility to get backend URL
import RevenueChart from './RevenueChart'; // 📊 Monthly revenue chart
import ManageOrders from './manageOrders/manageOrder'; // 📦 Order management component
import "../../Styles/Stylesdashboard.css"; // 🎨 Dashboard styles

const Dashboard = () => {
  const [loading, setLoading] = useState(true);     // ⏳ State to track data loading
  const [data, setData] = useState({});             // 📦 State to store fetched admin data
  const navigate = useNavigate();                   // 🔁 Router hook to navigate programmatically

  // 📡 Fetch admin dashboard stats when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        setData(response.data);   // ✅ Store fetched stats
        setLoading(false);        // 🔁 Stop loading spinner
      } catch (error) {
        console.error('Erreur:', error); // ❌ Handle API errors
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔐 Logout handler: clear token and redirect
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  // 🌀 Show loading screen while data is being fetched
  if (loading) {
    return (
      <div className="dashboard-loading">
        <Loading />
      </div>
    );
  }


  return (
    <div dir="ltr" className="dashboard-main enhanced-dashboard">
      {/* 📊 Stats */}
      <section className="dashboard-stats">
        {[
          { icon: <FaUser />, value: data?.totalUsers, label: "Utilisateurs Totals" },
          { icon: <FaBoxOpen />, value: data?.totalProducts, label: "Total des Produits" },
          { icon: <FaChartLine />, value: `${data?.totalSales} TND`, label: "Total des Ventes" },
          { icon: <FaClipboardList />, value: data?.totalOrders, label: "Total des Commandes" },
        ].map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </section>

      {/* 📈 Chart */}
      <section className="dashboard-section">
        <div className="font-semibold mb-4 text-lg">Le nombre de commandes par mois</div>
        <div className="chart-container">
          <RevenueChart />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
