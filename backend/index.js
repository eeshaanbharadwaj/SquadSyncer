import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import requestRoutes from "./routes/requestRoutes.js"

dotenv.config()
const app = express()
app.use(cors({
  origin: "*" // on deployment, change this to the domain you want
}))
// allow express to parse body
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({ extended:true}))
const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Connected to Database")
})
.catch((error)=>{
    console.log("It's Error!")
    console.log(error)
})

app.use("/auth",authRoutes);
app.use("/post",postRoutes);
app.use("/request",requestRoutes);


app.get("/", (req, res) => {
    res.send("Hello DEV !!")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})