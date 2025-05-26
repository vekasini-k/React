import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import DBcon from "./utils/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";

dotenv.config()

const app=express();

DBcon();
app.use(cors());
app.use(express.json());

app.use('/auth',authRoutes)
app.use('/todos', todoRoutes);

const PORT= process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.send("Hello from backend")
})

app.listen(PORT,()=>{
    console.log(`App is running on the port ${PORT}`)
})