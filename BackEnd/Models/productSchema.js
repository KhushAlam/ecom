import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        maincategory: {
            type: String,
            required: true,
            trim: true,
        },
        subcategory: {
            type: String,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        color: {
            type: String,
            trim: true,
        },
        size: {
            type: String,
            trim: true,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        disCount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        stock: {
            type: Boolean,
            required:true
        },
        stockQuantity: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            trim: true,
        },
        pic: {
            type: [String],
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);


const Productmodel = mongoose.model("Productmodel", productSchema);

export default Productmodel;
