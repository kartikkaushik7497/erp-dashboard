import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "../components/SummaryCard";
import DataTable from "../components/DataTable";
import ChartComponent from "../components/ChartComponent";
import "./Dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [chart, setChart] = useState(null);
  const [table, setTable] = useState([]);

  const token = localStorage.getItem("token");

  // ---- API CALLS ----

  const fetchSummary = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSummary(res.data);
  };

  const fetchChart = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/chart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setChart(res.data);
  };

  const fetchTable = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/table", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTable(res.data.data);
  };

  useEffect(() => {
    fetchSummary();
    fetchChart();
    fetchTable();
  }, []);

  if (!summary || !chart) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      <h1>ERP Dashboard</h1>

      <div className="cards">
        <SummaryCard title="Total Sales" value={"₹" + summary.totalSales} />
        <SummaryCard title="Total Orders" value={summary.totalOrders} />
        <SummaryCard title="Inventory Count" value={summary.inventoryCount} />
      </div>

      <div className="chart">
        <ChartComponent labels={chart.labels} values={chart.values} />
      </div>

      <div className="table">
        <DataTable rows={table} />
      </div>
    </div>
  );
}

export default Dashboard;
