import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/Users")
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