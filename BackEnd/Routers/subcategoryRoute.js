import express from "express";
import multer from "multer";
import cloudnary from "../Database/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Subcategorymodel from "../Models/subcategorySchema.js"

const subcategoryRouter = express.Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudnary,
    params: {
        folder: "Subcatogory",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});


subcategoryRouter.get("/get", upload.single("pic"), async (req, res) => {
    try {
        const data = await Subcategorymodel.find()

        if (!data) {
            return res.status(404).json({data:[], message: "No Any Data are Found" })
        } else {
            return res.status(200).json({ data: data, message: "data found" })
        }

    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

subcategoryRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        const { name, active } = req.body

        if (!req.file) {
            return res.status(400).json({ message: "Picture is not found" })
        }

        const newdata = new Subcategorymodel({
            name,
            active,
            pic: req.file.path
        })

        const savedata = await newdata.save()

        if (!savedata) {
            return res.json({ message: "Problem in saved data" })
        }
        res.status(200).json({ message: "Data Saved Successfully" })
    }
    catch (err) {
        return res.status.json({ message: err.message })
    }
})
subcategoryRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        const { id } = req.params
        let existdata = await Subcategorymodel.findById(id);
        if (!existdata) {
            return res.status(500).json({ message: "Data Not Found " })
        }

        let { name, active } = req.body

        name = name ? name : existdata.name;
        active = active ? active : existdata.active;
        let pic;
        if (req.file) {
            pic = req.file.path
        } else {
            pic = existdata.pic
        }

        await Subcategorymodel.findByIdAndUpdate(id, { name, pic, active }, { new: true, runVslidator: true })
        
        return res.status(500).json({ message: "Data updated Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
subcategoryRouter.delete("/delete", async (req, res) => {
    try {
        const { id } = req.params
        let deleted = await Subcategorymodel.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: 'data not found' })
        else return res.status(200).json({ message: "data deleted" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default subcategoryRouter