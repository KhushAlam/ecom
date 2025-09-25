import express from "express"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudnary from "../Database/cloudinary.js";
import ContactusModel from "../Models/contactusSchema.js";

const contactusRouter = express.Router()


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


contactusRouter.get("/get", async (req, res) => {
    try {
        const data = await ContactusModel.find()
        if (data) {
            return res.status(200).json({ data: data, message: 'data Found' })
        } else {
            return res.status(400).json({ message: "No any Data" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

contactusRouter.post("/create", upload.any(), async (req, res) => {
    try {
        const { name, email, phone, subject, message, active, date } = req.body;

        const newdata = new ContactusModel({
            name,
            email,
            phone,
            subject,
            message,
            active,
            date
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

contactusRouter.put("/update/:id", upload.any(), async (req, res) => {
    try {
        const { id } = req.params;
        const existdata = await ContactusModel.findById(id);

        if (!existdata) {
            return res.status(404).json({ message: "Data not Found" });
        }

        const { name, active, phone, email, subject, message, date } = req.body;
        const updatedName = name ? name : existdata.name;
        const updatedActive = active ? active : existdata.active;
        const updatedPhone = phone ? phone : existdata.phone;
        const updatedemail = email ? email : existdata.email;
        const updatedsubject = subject ? subject : existdata.subject;
        const updatedmessage = message ? message : existdata.message;
        const updateddate = date ? date : existdata.date;

        const updatedData = await ContactusModel.findByIdAndUpdate(
            id,
            { name: updatedName, active: updatedActive, phone: updatedPhone, email: updatedemail, subject: updatedsubject, message: updatedmessage, date: updateddate },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: "Data updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

contactusRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        let deleted = await ContactusModel.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: "data not Found" })

        else return res.status(200).json({ message: "Data Deleted Sucessfully" })

    } catch (err) { return res.json({ message: err.message }) }
})
export default contactusRouter