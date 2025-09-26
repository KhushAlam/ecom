import express from "express";
import TestimonialModel from "../Models/testimonialSchema.js";
import multer from "multer";
import cloudnary from "../Database/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const testimonalRouter = express.Router();

//file handling using multer and cloudinary

const storage = new CloudinaryStorage({
    cloudinary: cloudnary,
    params: {
        folder: "Testimonial",
        allowed_formats: ["jpg", "png", "jpeg"],
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
})

testimonalRouter.get("/get", async (req, res) => {
    try {
        const data = await TestimonialModel.find()
        if (!data) {
            return res.status(404).json({data:[], message: "No Any Data" })
        } else {
            return res.status(201).json({ data: data, message: "Data Found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

testimonalRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        const { name, message, active } = req.body
        if (!req.file) {
            return res.status(404).json({ message: "File is Important" })
        }

        const newdata = new TestimonialModel({
            name,
            message,
            active,
            pic: req.file.path
        });

        const store = await newdata.save()
        if (!store) {
            return res.status(400).json({ message: "problem in data savind internal problem" })
        }
        return res.status(200).json({ message: "Data Saved Sucessfully" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

testimonalRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        const { id } = req.params;
        const existdata = await TestimonialModel.findById(id);

        if (!existdata) {
            return res.status(404).json({ message: "Data not Found" });
        }

        let { name, active, message } = req.body;
        name = name ? name : existdata.name;
        message = message ? message : existdata.message
        active = active ? active : existdata.active;
        let pic = req.file ? req.file.path : existdata.pic;

        const updatedData = await TestimonialModel.findByIdAndUpdate(
            id,
            { name: name, active: active, pic: pic, message: message },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Data updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})
testimonalRouter.delete("/delete/:id", async (req, res) => {
    try {
        let { id } = req.params
        let deleted = await TestimonialModel.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "Data Not Found" })
        }
        return res.status(200).json({ message: "Data Deleted Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
export default testimonalRouter