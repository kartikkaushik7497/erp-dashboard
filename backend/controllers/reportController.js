const Sale = require("../models/Sale");

// 🟩 SUMMARY FROM MONGO
exports.getSummary = async (req, res) => {
  try {
    const sales = await Sale.find();

    const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
    const totalOrders = sales.length;

    // Later you can add inventory collection — using dummy 150 for now:
    const inventoryCount = 150;

    res.json({ totalSales, totalOrders, inventoryCount });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching summary" });
  }
};


// 🟩 CHART DATA FROM MONGO
exports.getChart = async (req, res) => {
  try {
    const sales = await Sale.find();

    const grouped = {};

    sales.forEach((sale) => {
      const d = new Date(sale.date);

      const key = d.toLocaleString("default", { month: "short" }) + " " + d.getFullYear();

      if (!grouped[key]) grouped[key] = 0;
      grouped[key] += sale.amount;
    });

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    res.json({ labels, values });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching chart" });
  }
};


// 🟩 SALES TABLE FROM MONGO
exports.getTable = async (req, res) => {
  try {
    const rows = await Sale.find().sort({ date: -1 });
    res.json({ data: rows });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching table" });
  }
};
