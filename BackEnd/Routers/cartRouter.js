import express from "express"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../Database/cloudinary.js";
import CartModel from "../Models/cartSchema.js";

const CartRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Cart",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});

CartRouter.get("/get", async (req, res) => {
    try {
        const data = await CartModel.find()
        if (data) {
            return res.status(200).json({ data: data, message: 'data Found' })
        } else {
            return res.status(400).json({ data: [], message: "No any Data" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
CartRouter.post("/create",upload.any() ,async (req, res) => {
    try {
        const { product, user, total, name, brand, color, size, price,quentity, stockQuentity,pic } = req.body;
      
        const newdata = new CartModel({
            product, user, total, name, brand, color, size, price,quentity, stockQuentity, pic
        })

        let saved = await newdata.save()
        if (!saved) {
            return res.status(400).json({ message: "problem in data saving" })
        }
        return res.status(200).json({ message: " data saved sucessfully" })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message })
    }
})

CartRouter.put("/update:id", upload.any(), async (req, res) => {
    try {
        const { id } = req.params;
        let { product, user, total, name, brand, color, size, price, stockQuentity,pic } = req.body;
        const existdata = await CartModel.findById(id);
        if (!existdata) {
            return res.status(404).json({ message: "Data Not Found" })
        }

     pic =pic?pic:existdata.pic
        product = product ? product : existdata.product;
        user = user ? user : existdata.user;
        total = total ? total : existdata.total;
        name = name ? name : existdata.name;
        brand = brand ? brand : existdata.brand;
        color = color ? color : existdata.color;
        size = size ? size : existdata.size;
        price = price ? price : existdata.price;
        stockQuentity = stockQuentity ? stockQuentity : existdata.stockQuentity;

        const update = await CartModel.findByIdAndUpdate(id, { product, user, total, name, brand, color, size, price, stockQuentity, pic },
            { new: true, runValidator: true }
        )
        if (!update) {
            return res.status(404).json({ message: "Problem in data update" })
        } else {
            return res.status(201).json({ message: "Data Updated Sucessfully" })
        }

    } catch (err) {
        return res.status(500).json({ data: [], message: err.message })
    }
})

CartRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        let deleted = await CartModel.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "data not found" })
        } else { return res.status(201).json({ message: "Data Deleted Sucessfully" }) }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default CartRouter;