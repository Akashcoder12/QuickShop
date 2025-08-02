const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // ✅ Fixed here
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Processing", // pending, shipped, delivered, cancelled
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
