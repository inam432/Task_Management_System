import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/Users")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB not connected");
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenumber:String,
    password: String
});
const  signUpModel= mongoose.model("SignUp", userSchema);
export default signUpModel;
