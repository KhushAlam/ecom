import mongoose from "mongoose";

const chekoutSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    OrderStatus: {
        type: String,
        required: true,
        enum: ["Order is Placed", "Order is Packed", "Order is Ready to Ship", "Order is Shipped", "Order is in Transit", "Order is Reached at Final Delivery Station", "Order is out for Delivery", "Delivered"]
    },
    PaymentMode: {
        type: String,
        required: true,
        enum: ["COD", "NetBanking"]
    },
    PaymentStatus: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    product: {
        type: [String],
        default: [],
    }
})

const CheckoutModel = mongoose.model("CheckModel", chekoutSchema);
export default CheckoutModel;