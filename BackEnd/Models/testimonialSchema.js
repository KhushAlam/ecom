import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "name length must be Atleast 3 character"]
    },
    pic: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: [20, "Minimum length must be Atleast 20 character's "]
    },
    active: {
        type: Boolean,
        default: true
    }
})

const TestimonialModel = mongoose.model("Testimonial", testimonialSchema)
export default TestimonialModel;