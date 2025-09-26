import mongoose from "mongoose";

const contactusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name length must be minimum 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email"
        ],
    },
    phone: {
        type: Number,
        required:true,
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: [30, 'Minimum length must be 30 words']
    },
    active:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
    }
});

const ContactusModel = mongoose.model("ContactusModel", contactusSchema);

export default ContactusModel;
