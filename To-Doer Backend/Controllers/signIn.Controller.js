import signUpModel from "../Models/users_SignUp.model.js";
export const signIn =async(req, res) => {

    const {name2,email2,phonenumber2,password2} = req.body;

    const user =await signUpModel.findOne({name:name2,
        email:email2,phonenumber:phonenumber2,password:password2
    });
   

    if (user) {

        res.json({
            message: "Login Successful",
            user
        });

    } else {

        res.json({
            message: "Login not successful"
        });

    }

};