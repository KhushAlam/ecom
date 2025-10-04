import express from "express"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../Database/cloudinary.js";
import WishlistModel from "../Models/wishlistSchema.js";
const WishlistRoute = express.Router();

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

WishlistRoute.get("/get", async (req, res) => {
    try {
        const data = await WishlistModel.find()
        if (data) {
            return res.status(200).json({ data: data, message: 'data Found' })
        } else {
            return res.status(400).json({ data: [], message: "No any Data" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
WishlistRoute.post("/create",upload.any(), async (req, res) => {
    try {
        const { product, user, name, brand, color, size, price, stockQuantity, pic } = req.body;

        const newData = new WishlistModel({
            product,
            user,
            name,
            brand,
            color,
            size,
            price,
            stockQuantity,
            pic
        });

        const saved = await newData.save();
        if (!saved) {
            return res.status(400).json({ message: "Problem in data saving" });
        }

        return res.status(200).json({
            message: "Data saved successfully",
            data: saved
        });
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json({ message: err.message });
    }
});


WishlistRoute.put("/update:id",  async (req, res) => {
    try {
        const { id } = req.params;
        let { product, user, name, brand, color, size, price, stockQuantity, pic } = req.body;
        const existdata = await WishlistModel.findById(id);
        if (!existdata) {
            return res.status(404).json({ message: "Data Not Found" })
        }

        pic = pic ? pic : existdata.pic
        product = product ? product : existdata.product;
        user = user ? user : existdata.user;
        name = name ? name : existdata.name;
        brand = brand ? brand : existdata.brand;
        color = color ? color : existdata.color;
        size = size ? size : existdata.size;
        price = price ? price : existdata.price;
        stockQuantity = stockQuantity ? stockQuantity : existdata.stockQuantity;

        const update = await WishlistModel.findByIdAndUpdate(id, { product, user, name, brand, color, size, price, stockQuantity, pic },
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

WishlistRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        let deleted = await WishlistModel.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "data not found" })
        } else { return res.status(201).json({ message: "Data Deleted Sucessfully" }) }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default WishlistRoute;