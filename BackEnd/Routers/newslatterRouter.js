import express from "express";
import NewslatterModel from "../Models/newslatterSchema.js";
import multer from "multer";
import cloudnary from "../Database/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const newslatterRouter = express.Router();

//file handling using multer and cloudinary

const storage = new CloudinaryStorage({
    cloudinary: cloudnary,
    params: {
        folder: "Newslatter",
        allowed_formats: ["jpg", "png", "jpeg"],
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
})

newslatterRouter.get("/get", async (req, res) => {
    try {
        const data = await NewslatterModel.find()
        if (!data) {
            return res.status(404).json({ message: "No Any Data" })
        } else {
            return res.status(201).json({ data: data, message: "Data Found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

newslatterRouter.post("/create", upload.any(), async (req, res) => {
    try {
        const { email, active } = req.body

        const newdata = new NewslatterModel({
            email,
            active,
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

newslatterRouter.put("/update/:id", upload.any(), async (req, res) => {
    try {
        const { id } = req.params;
        const existdata = await NewslatterModel.findById(id);

        if (!existdata) {
            return res.status(404).json({ message: "Data not Found" });
        }

        let { name, active,  } = req.body;
        name = name ? name : existdata.name;
        active = active ? active : existdata.active;

        const updatedData = await NewslatterModel.findByIdAndUpdate(
            id,
            { name: name, active: active },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Data updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})
newslatterRouter.delete("/delete/:id", async (req, res) => {
    try {
        let { id } = req.params
        let deleted = await NewslatterModel.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "Data Not Found" })
        }
        return res.status(200).json({ message: "Data Deleted Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
export default newslatterRouter