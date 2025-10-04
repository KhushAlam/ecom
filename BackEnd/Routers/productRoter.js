import express from "express";
import multer from "multer";
import cloudnary from "../Database/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Productmodel from "../Models/productSchema.js";

const productRouter = express.Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudnary,
    params: {
        folder: "Products",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});

productRouter.get("/get", async (req, res) => {
    try {
        const data = await Productmodel.find();
        if (!data) {
            return res.status(404).json({ message: "Any data not Founded" })
        } else {
            return res.status(200).json({ data: data, message: "Data Found Sucessfully" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

productRouter.get("/get/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Productmodel.findById(id);

        if (!data) {
            return res.status(404).json({ data: [], message: "Data Not Found" })
        }
        return res.status(201).json({ data: data, message: "Data Found SucessFully" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

productRouter.post("/create", upload.array("pic"), async (req, res) => {
    try {
        const { name, maincategory, subcategory, brand, color, size, basePrice, disCount, finalPrice, stock, stockQuantity, description, active } = req.body
        if (!req.files || req.files.length === 0) {
            return res.status(404).json({ message: "Images Not Found ! Images Are Required" })
        }

        const newdata = new Productmodel({
            name,
            maincategory,
            subcategory,
            brand,
            color,
            size: Number(size),
            basePrice: Number(basePrice),
            disCount: Number(disCount) || 0,
            finalPrice: Number(finalPrice),
            stock: stock === "false" ? false : true,
            stockQuantity: Number(stockQuantity) || 0,
            description,
            active: active === "false" ? false : true,
            pic: req.files.map(pic => pic.path)
        });
        await newdata.save();
        return res.status(201).json({ message: "Data Saved Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

productRouter.put("/update/:id", upload.array("pic"), async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const existdata = await Productmodel.findById(id);

        if (!existdata) {
            return res.status(404).json({ message: "Data Not Found" });
        }

        const {
            name,
            maincategory,
            subcategory,
            brand,
            color,
            size,
            basePrice,
            disCount,
            finalPrice,
            stock,
            stockQuantity,
            description,
            active,
        } = req.body;

        // Prepare updated fields
        const updatedFields = {
            name: name || existdata.name,
            maincategory: maincategory || existdata.maincategory,
            subcategory: subcategory || existdata.subcategory,
            brand: brand || existdata.brand,
            color: color || existdata.color,
            size: size ? Number(size) : existdata.size,
            basePrice: basePrice ? Number(basePrice) : existdata.basePrice,
            disCount: disCount ? Number(disCount) : existdata.disCount,
            finalPrice: finalPrice ? Number(finalPrice) : existdata.finalPrice,
            stock:
                stock !== undefined
                    ? stock === "false"
                        ? false
                        : true
                    : existdata.stock,
            stockQuantity: stockQuantity
                ? Number(stockQuantity)
                : existdata.stockQuantity,
            description: description || existdata.description,
            active:
                active !== undefined
                    ? active === "false"
                        ? false
                        : true
                    : existdata.active,
            pic:
                req.files && req.files.length > 0
                    ? req.files.map((pics) => pics.path)
                    : existdata.pic,
        };

        const updatedData = await Productmodel.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true,
        });

        return res
            .status(200)
            .json({ message: "Data updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

productRouter.delete("/delete/:id", async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "Id Not Found" })
        }
        let deleted = await Productmodel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Data Not Found For Delete" })
        }
        return res.status(201).json({ message: "Data Deleted Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default productRouter