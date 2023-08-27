import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import prductRoutes from "./routes/productRoute.js";
import cors from "cors";

//config Env
dotenv.config();

//connect to database
connectDB();

//rest object
const app = express();

//middleWare
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", prductRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Fashion Wear Project</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server running on mode ${PORT}`);
});
