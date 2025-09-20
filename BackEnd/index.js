import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import Connectdb from "./Database/db.js"
import cloudnary from "./Database/cloudnary.js";
import maincategoryRouter from "./Routers/maincategoryRouter.js"
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
app.listen(port, () => {
    console.log("server running on port 8080")
});