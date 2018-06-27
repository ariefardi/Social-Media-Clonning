const mongoose = require("mongoose");
const user  = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Controller{
    static register(req,res){
        console.log(req.body,'-------------')
        let username = req.body.username
        // let password = req.body.password
        let email = req.body.email
        if (req.body.password.length<6) {
            res.status(500).json({
                message: 'password must be atleast 6 characters'
            })
        }
        else{
            const salt = bcrypt.genSaltSync(7)
            const hash = bcrypt.hashSync(req.body.password,salt)
            let password = hash
            user.findOne({username : username})
            .then(found=>{
                if (found) {
                    console.log('fond gak?')
                    res.status(500).json({
                        message: 'username used'
                    })
                }
                else{
                    console.log('gak ketemu')
                    user.create({
                        username: username,
                        password: password,
                        email: email
                    })
                    .then(user=>{
                        res.status(200).json({
                            message: 'berhasil',
                            user
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: err.message
                        })
                    })
                }
            })
            .catch(err=>{
                if (err) {
                    console.log(err)
                }
            })

        }
    }
    static login(req,res){
        let username = req.body.username
        let token = jwt.sign({username}, process.env.SECRET_KEY)
        res.status(200).json({
            message: 'succesfully login',
            token,
            username
        })
    }
}

module.exports = Controller