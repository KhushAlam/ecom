import express from "express";
import multer from "multer";
import cloudnary from "../Database/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import CheckoutModel from "../Models/checkoutSchema.js"

const checkoutRouter = express.Router();

const Storage = new CloudinaryStorage({
    cloudinary: cloudnary,
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
        const { userid, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date } = req.body;
        if (!req.files && req.files.length === 0) {
            return res.status(404).json("Product are Required")
        }
        const product = req.files.map(pic => pic.path);

        const newdate = new CheckoutModel({
            userid, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date, product,
        })

        await newdate.save();
        return res.status(500).json({ message: "Data Saved Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

checkoutRouter.put("/update/:id", upload.array("pic"), async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(404).json({ message: "Id Not Found" })

        let existdata = await CheckoutModel.findById(id);
        if (!existdata) return res.status(404).json({ message: "Data Not Found" })

        let { userid, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date } = req.body;
        const product = req.files && req.files.length > 0 ? req.files.map(pic => pic.path) : existdata.product

        userid = userid ? userid : existdata.userid;
        OrderStatus = OrderStatus ? OrderStatus : existdata.OrderStatus;
        PaymentMode = PaymentMode ? PaymentMode : existdata.PaymentMode;
        PaymentStatus = PaymentStatus ? PaymentStatus : existdata.PaymentStatus;
        subtotal = subtotal ? subtotal : existdata.subtotal;
        shipping = shipping ? shipping : existdata.shipping;
        total = total ? total : existdata.total;
        date = date ? date : existdata.date;

        await CheckoutModel.findByIdAndUpdate(id,
            { userid, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date, product }, { new: true, runValidator: true }
        )

        res.status(201).json({ message: "Data Updated Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
checkoutRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(404).json({ message: "Id Not Found" })
        await CheckoutModel.findByIdAndDelete(id)
        res.status(201).json({ message: "Data Deleted Sucessfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default checkoutRouter