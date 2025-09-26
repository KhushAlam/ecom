import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be less than 50 characters"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [5, "Username must be at least 5 characters"],
        maxlength: [30, "Username must be less than 30 characters"]
    },
    pic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^\d{10}$/, "Mobile number must be 10 digits"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    cpassword: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Super Admin"],
        default: "User",
        required: true,
    },
    address:{
        type:String
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



const User = mongoose.model("User", userSchema);
export default User;