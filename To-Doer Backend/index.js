import express from "express";
import router from "./Routes/web_Routes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router);
app.listen(process.env.port || 3425, () => {
    console.log("Server is running");
});