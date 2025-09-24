import express from "express";
import multer from "multer";
import cloudnary from "../Database/cloudnary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import CheckoutModel from "../Models/checkoutSchema.js"

const checkoutRouter = express.Router();

const Storage = CloudinaryStorage({
    clodinary: cloudnary,
    params: {
        folder: "Checkout",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
})

const upload = multer({
    storage: Storage,
    limits: { fileSize: 1 * 1024 * 1024 }
})

checkoutRouter.get("/get", async (req, res) => {
    try {
        let data = await CheckoutModel.find();
        if (!data) {
            return res.status(404).json({ message: "Data not Found" })
        }
        else {
            return res.status(201).json({ data: data, message: "Data Found Sucessfully" })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

checkoutRouter.post("create", upload.array("pic"), async (req, res) => {
    try { 
        const {name,}=req.body;
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default checkoutRouter