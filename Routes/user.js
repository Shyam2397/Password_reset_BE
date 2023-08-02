import express from "express";
import { user } from "../Models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", (req, res) => {
  let { name, email, password, dateofbirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateofbirth = dateofbirth.trim();

  if (name == "" || email == "" || password == "" || dateofbirth == "") {
    res.status(404).send({ message: "Empty input field" });
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    res.status(404).send({ message: "Invalid name entered" });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(404).send({ message: "Invalid email entered" });
  }else if(!new Date(dateofbirth).getTime()){
    res.status(404).send({ message: "Invalid date of birth entered" });
  }else if(password.length <= 8){
    res.status(404).send({ message: "Password is too short!" });
  }else{
    user.find({email}).then(result=>{
        if(result.length){
            res.status(404).send({ message: "user with the provided email already exists" });
        }else{
            const saltRounds = 10;
            bcrypt.hash(password,saltRounds).then(hashedPassword=>{
                const newUser = new user({
                    name,
                    email,
                    password:hashedPassword,
                    dateofbirth
                });
                newUser.save().then(result=>{
                    res.status(201).send({ newUser,message: "Signup sucessfully" });
                }).catch(err=>{
                    res.status(404).send({ newUser,message: "An error occured while hashing" });
                })
            }).catch(err=>{
                res.status(404).send({ newUser,message: "An error occured while hashing" });
            })
        }
    }).catch(err=>{
        console.log(err);
        res.status(404).send({ message: "An error occurred while checking for existing user!" });
    })
  }
});

router.post("/signin", (req, res) => {
    let {  email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if(email==""||password==""){
        res.status(404).send({message: "Empty credentials supplied" });
    }else{
        user.find({email}).then(data=>{
            if(data.length){
                const hashedPassword = data[0].password;
                bcrypt.compare(password,hashedPassword).then(result=>{
                    if(result){
                        res.status(201).send({data,message: "Signin sucessfully" });
                    }else{
                        res.status(404).send({message: "Invalid password entered" });
                    }
                }).catch(err=>{
                    res.status(404).send({message: "An error occured while comparing password" });
                })
            }else{
                res.status(404).send({message: "Invalid credentials entered!" });
            }
        }).catch(err=>{
            res.status(404).send({message: "An error occured while checking existing user" });
        })
    }
});

export const userRouter = router;
