const user  = require("../models/user-model");
const bcrypt = require ('bcrypt')

class Authentication {
    static auth(req,res,next){
        let username = req.body.username
        user.findOne({username: username})
        .then(user=>{
            if (user) {
                let isPasswordTrue = bcrypt.compareSync(req.body.password, user.password)
                if (isPasswordTrue) {
                    next()
                }
                else{
                    res.status(400).json({
                        message: 'username/password salah'
                    })
                } 
            }
            else{
                res.status(400).json({
                    message: 'username/password salah'
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = Authentication