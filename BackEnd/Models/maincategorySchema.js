import mongoose, { models } from "mongoose";

const maincategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name lenght mush be minimum 3 character"]
    },
})

const maincategorymodel = mongoose.model("maincategorymodel", maincategorySchema);
module.exports = maincategorymodel