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

checkoutRouter.post("/create", upload.any(), async (req, res) => {
    try {
        let  { user, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date,product } = req.body;
         
         if (product) {
            product = JSON.parse(product);   // <--- parse here
        }

        if (date) {
            date = new Date(date);  // ensure date object
        }

        const newdate = new CheckoutModel({
            user, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date, product,
        })

        await newdate.save();
        return res.status(200).json({ message: "Data Saved Sucessfully" })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message })
    }
})

checkoutRouter.put("/update/:id", upload.any(), async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(404).json({ message: "Id Not Found" })

        let existdata = await CheckoutModel.findById(id);
        if (!existdata) return res.status(404).json({ message: "Data Not Found" })

        let { user, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date, product } = req.body;
        product = product?.length ? product : existdata.product;

        user = user ? user : existdata.user;
        OrderStatus = OrderStatus ? OrderStatus : existdata.OrderStatus;
        PaymentMode = PaymentMode ? PaymentMode : existdata.PaymentMode;
        PaymentStatus = PaymentStatus ? PaymentStatus : existdata.PaymentStatus;
        subtotal = subtotal ? subtotal : existdata.subtotal;
        shipping = shipping ? shipping : existdata.shipping;
        total = total ? total : existdata.total;
        date = date ? date : existdata.date;

        await CheckoutModel.findByIdAndUpdate(id,
            { user, OrderStatus, PaymentMode, PaymentStatus, subtotal, shipping, total, date, product }, { new: true, runValidator: true }
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