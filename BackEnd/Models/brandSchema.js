import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name length must be minimum 3 characters"]
    },
    pic: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

const BrandModel = mongoose.model("BrandModel", brandSchema);

export default BrandModel;
