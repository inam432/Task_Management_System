import mongoose from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.db_url_Users)
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
