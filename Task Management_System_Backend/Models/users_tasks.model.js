import mongoose from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.db_url_Users)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB not connected");
});
const taskSchema = new mongoose.Schema({
    taskName: String,
    deadline: String,
    email: String
});
const Task = mongoose.model("Task", taskSchema);
export default Task;