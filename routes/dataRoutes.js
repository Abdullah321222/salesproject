const express = require('express');
const router = express.Router();
const Customer = require('../models/shopifyModels');
const Order = require("../models/order")

// Total Sales Over Time
router.get('/sales/total', async (req, res) => {
    try {
        // const data = await Order.aggregate([
        //     { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, total: { $sum: "$total_price_set.shop_money.amount" } } },
        //     { $sort: { _id: 1 } }
        // ]);
        const data = await Order.find()
        res.json({
            labels: data.map(d => `${d._id.year}-${d._id.month}-${d._id.day}`),
            values: data.map(d => d.totalSales)
        });
        console.log(data);
        res.json(data[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sales Growth Rate Over Time
router.get('/sales/growth', async (req, res) => {
    try {
        const data = await Order.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, total: { $sum: "$total_price_set.shop_money.amount" } } },
            { $sort: { _id: 1 } },
            { $project: { _id: 1, total: 1, growthRate: { $divide: [{ $subtract: ["$total", { $ifNull: [{ $arrayElemAt: ["$total", -2] }, 0] }] }, { $ifNull: [{ $arrayElemAt: ["$total", -2] }, 1] }] } } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// New Customers Added Over Time
router.get('/customers/new', async (req, res) => {
    try {
        const data = await Customer.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Number of Repeat Customers
router.get('/customers/repeat', async (req, res) => {
    try {
        const data = await Customer.aggregate([
            { $lookup: { from: "orders", localField: "_id", foreignField: "customer_id", as: "orders" } },
            { $addFields: { orderCount: { $size: "$orders" } } },
            { $match: { orderCount: { $gt: 1 } } },
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Geographical Distribution of Customers
router.get('/customers/geographical', async (req, res) => {
    try {
        const data = await Customer.aggregate([
            { $group: { _id: "$default_address.city", count: { $sum: 1 } } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Customer Lifetime Value by Cohorts
router.get('/customers/lifetime', async (req, res) => {
    try {
        const data = await Customer.aggregate([
            { $lookup: { from: "orders", localField: "_id", foreignField: "customer_id", as: "orders" } },
            { $addFields: { totalLifetimeValue: { $sum: "$orders.total_price_set.shop_money.amount" } } },
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, lifetimeValue: { $sum: "$totalLifetimeValue" } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
