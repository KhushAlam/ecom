import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Connectdb from "./Database/db.js"
import maincategoryRouter from "./Routers/maincategoryRouter.js"
import testimonalRouter from "./Routers/tesimonialRouter.js";
import subcategoryRouter from "./Routers/subcategoryRoute.js";
import newslatterRouter from "./Routers/newslatterRouter.js";
import contactusRouter from "./Routers/contactusRouter.js";
import brandRouter from "./Routers/brandRouter.js";
import productRouter from "./Routers/productRoter.js";
import userRouter from "./Routers/userRouter.js";
import checkoutRouter from "./Routers/checkoutRouter.js";
import CartRouter from "./Routers/cartRouter.js";
import WishlistRoute from "./Routers/wishlistRouter .js";
import paymentRouter from "./Routers/Paymentrouter.js";
dotenv.config();


const port = process.env.PORT
const app = express()

//middleware 
app.use(cors({
   origin: [
    "https://ecom-w.onrender.com" // frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.options("*", cors());
app.use(express.urlencoded({ extended: true }))

app.use(express.json())


//Connect database 
Connectdb()


//Routes
app.use("/admin/maincategory", maincategoryRouter)
app.use("/admin/subcategory", subcategoryRouter)
app.use("/admin/testimonial", testimonalRouter)
app.use("/admin/newslatter", newslatterRouter)
app.use("/admin/contactus", contactusRouter)
app.use("/admin/brand", brandRouter)
app.use("/admin/product", productRouter)
app.use("/user", userRouter);
app.use("/checkout", checkoutRouter)
app.use("/cart",CartRouter);
app.use("/wishlist",WishlistRoute)
app.use("/api/payments",paymentRouter)

app.listen(port, () => {
    console.log("server running on port 8080")
});