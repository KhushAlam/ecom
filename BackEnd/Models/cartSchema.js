import mongoose from "mongoose"
const cartSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productmodel"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quentity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    pic: {
        type: String,
        required: true
    }
})

const CartModel = mongoose.model("CartModel", cartSchema);
export default CartModel