import signUpModel from "../Models/users_SignUp.model.js";
const signUp=async(req, res) => {
    const { name, email,phonenumber,password } = req.body;
    const existingUser = await signUpModel.findOne({ email });
    if (existingUser) {
        return res.json({
            message: "Email already exists"
        });
    }
    const signUpUser = new signUpModel({
        name,
        email,phonenumber,
        password
    });

     await signUpUser.save();

    res.json({
        message: "Signup Successful",
        signUpUser
    });

};
export default signUp;