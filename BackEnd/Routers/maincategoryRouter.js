import express from "express"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudnary from "../Database/cloudinary.js";
import Maincategorymodel from "../Models/maincategorySchema.js"

const maincategoryRouter = express.Router()


const storage = new CloudinaryStorage({
    cloudinary: cloudnary,
    params: {
        folder: "Maincatogory",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});


maincategoryRouter.get("/get", async (req, res) => {
    try {
        const data = await Maincategorymodel.find()
        if (data) {
            return res.status(200).json({ data: data, message: 'data Found' })
        } else {
            return res.status(400).json({ message: "No any Data" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

maincategoryRouter.post("/create", upload.single("pic"), async (req, res) => {
    try {
        const { name, active } = req.body;

        if (!req.file) {
            return res.status(404).json({ message: "Picture not found" })
        }
        const newdata = new Maincategorymodel({
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

maincategoryRouter.put("/update/:id", upload.single("pic"), async (req, res) => {
    try {
        const { id } = req.params;
        const existdata = await Maincategorymodel.findById(id);

        if (!existdata) {
            return res.status(404).json({ message: "Data not Found" });
        }

        let { name, active } = req.body;
        name = name ? name : existdata.name;
        active = active ? active : existdata.active;
       let pic = req.file ? req.file.path : existdata.pic;

        const updatedData = await Maincategorymodel.findByIdAndUpdate(
            id,
            { name, active, pic },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Data updated successfully", data: updatedData });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
});

maincategoryRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        let deleted = await Maincategorymodel.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: "data not Found" })

        else return res.status(200).json({ message: "Data Deleted Sucessfully" })

    } catch (err) { return res.json({ message: err.message }) }
})
export default maincategoryRouter