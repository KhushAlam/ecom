import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Connectdb from "./Database/db.js"
import maincategoryRouter from "./Routers/maincategoryRouter.js"
import testimonalRouter from "./Routers/tesimonialRouter.js";
import subcategoryRouter from "./Routers/subcategoryRoute.js";
import newslatterRouter from "./Routers/newslatterRouter copy.js";
dotenv.config();


const port = process.env.PORT
const app = express()

//middleware 
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())


//Connect database 
Connectdb()


//Routes
app.use("/admin/maincategory", maincategoryRouter)
app.use("/admin/subcategory", subcategoryRouter)
app.use("/admin/testimonial", testimonalRouter)
app.use("/admin/newslatter", newslatterRouter)
app.listen(port, () => {
    console.log("server running on port 8080")
});