var express = require('express');
var router = express.Router();

const userController = require("../controller/user-controller");
const loginController = require("../controller/login-controller")
const authentication = require("../middlewares/authentications");


/* GET users listing. */
router.get('/', userController.getAllUsers)

router.post('/register',authentication.auth,loginController.register)
router.post('/login',authentication.auth,loginController.login)

module.exports = router;
