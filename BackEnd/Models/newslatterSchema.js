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
    message: {
        type: String,
        required: true,
        minlength: [30, "Message Length Must be Atleast 30 Word"]
    },
    active:{
        type:Boolean,
        default:true
    }

})

const NewslatterModel = mongoose.model("NewslatterModel",NewslatterSchema);
export default NewslatterModel