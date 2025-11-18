// backend/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");
const Sale = require("./models/sale");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/erp_dashboard";

async function seed() {
  await mongoose.connect(MONGO_URI);

  const hashed = await bcrypt.hash("pass123", 10);

  const users = [
    { email: "viewer@vite.co.in", password: hashed, role: "viewer" },
    { email: "analyst@vite.co.in", password: hashed, role: "analyst" }
  ];

  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) await User.create(u);
  }

  const sampleSales = [
    { date: new Date(), product: "Laptop", category: "Electronics", amount: 55000 },
    { date: new Date(Date.now() - 5 * 24*60*60*1000), product: "Phone", category: "Mobiles", amount: 30000 },
    { date: new Date(new Date().setMonth(new Date().getMonth() - 1)), product: "Camera", category: "Cameras", amount: 45000 },
    { date: new Date(new Date().setMonth(new Date().getMonth() - 2)), product: "Headphones", category: "Accessories", amount: 5000 },
    { date: new Date(new Date().setMonth(new Date().getMonth() - 3)), product: "Monitor", category: "Electronics", amount: 15000 },
    { date: new Date(new Date().setMonth(new Date().getMonth() - 4)), product: "Mouse", category: "Accessories", amount: 1200 },
    { date: new Date(new Date().setMonth(new Date().getMonth() - 5)), product: "Keyboard", category: "Accessories", amount: 2400 }
  ];

  for (const s of sampleSales) {
    const exists = await Sale.findOne({ product: s.product, amount: s.amount, date: s.date });
    if (!exists) await Sale.create(s);
  }

  console.log("Seeding completed");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
