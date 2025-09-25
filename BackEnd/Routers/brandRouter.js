import express from "express"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../Database/cloudinary.js";
import BrandModel from "../Models/brandSchema.js";
const brandRouter = express.Router()


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Maincatogory",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});


brandRouter.get("/get", async (req, res) => {
    try {
        const data = await BrandModel.find()
        if (data) {
            return res.status(200).json({ data: data, message: 'data Found' })
        } else {
            return res.status(400).json({ message: "No any Data" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

brandRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        const { name, active } = req.body;

        if (!req.file) {
            return res.status(404).json({ message: "Picture not found" })
        }
        const newdata = new BrandModel({
            name,
            active,
            pic: req.file.path,
        })
        let savedata = await newdata.save()
        if (!savedata) {
            return res.status(400).json({ message: "problem in data saving" })
        }
        return res.status(200).json({ message: " data saved sucessfully" })


    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

brandRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        const { id } = req.params;
        const existdata = await BrandModel.findById(id);

        if (!existdata) {
            return res.status(404).json({ message: "Data not Found" });
        }

        const { name, active } = req.body;
        const updatedName = name ? name : existdata.name;
        const updatedActive = active ? active : existdata.active;
        const updatedPic = req.file ? req.file.path : existdata.pic;

        const updatedData = await BrandModel.findByIdAndUpdate(
            id,
            { name: updatedName, active: updatedActive, pic: updatedPic },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Data updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

brandRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        let deleted = await BrandModel.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: "data not Found" })

        else return res.status(200).json({ message: "Data Deleted Sucessfully" })

    } catch (err) { return res.json({ message: err.message }) }
})
export default brandRouter