import mongoose from "mongoose";

const NewslatterSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email"
        ],
        unique: true
    },
    active:{
        type:Boolean,
        default:true
    }

})

const NewslatterModel = mongoose.model("NewslatterModel",NewslatterSchema);
export default NewslatterModel