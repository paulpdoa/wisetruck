const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Models
const User = require('../model/User');

const maxAge = 3 * 24 * 24 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}

//for sending email to users
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_ACCOUNT, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    }
});


const handleError = (err) => { // Handling errors 

    let errMssg = '';

    if(err.message === 'Incorrect password') {
        errMssg = 'Your password is incorrect, please check your password';
    }

    if(err.code === 11000) {
        errMssg = 'This email is already in use, please choose another email'
    }

    if(err.message === 'This email doesn\'t exist' || err.message === "Cannot read properties of null (reading 'typeOfUser')") {
        errMssg = 'Your email is incorrect or doesn\'t exist, please check your email';
    }
    return errMssg;

}

module.exports.get_user = async (req,res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_user_detail = async (req,res) => {

    const { id } = req.params;

    try {  
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
    }
}

module.exports.post_user = async (req,res) => {
    const { firstName,lastName,middleName,phoneNumber,email,isApproved,typeOfUser,province,barangay,municipality,password,confirmPassword } = req.body;

    const validId = "req.files['idCard'][0].filename";

    try {
        if(password === confirmPassword) {
            const createUser = await User.create({ firstName,lastName,middleName,phoneNumber,email,isApproved,validId,typeOfUser,province,barangay,municipality,password });
            res.status(200).json({ mssg: `Congrats ${firstName}, you have successfully registered to Wisetruck App!`, redirect:'/login' });
        } else {
            res.status(200).json({mssg: `Password does not match, please check password`});
        }

    } catch(err) {
        console.log(err);
        const uniqueErr = handleError(err);
        res.status(400).json({ mssg: uniqueErr });
    }

}

module.exports.user_login = async (req,res) => {
    const { email,password } = req.body;

    // Check user type

    try {
        const checkUserType = await User.findOne({ email });
        const typeOfUser = checkUserType.typeOfUser;
        
        // If user is customer, redirect to customer page etc...
        if(typeOfUser === 'customer') {
            const customerLogin = await User.login(email,password);
            const token = createToken(customerLogin._id);
            res.status(200).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/customer' });
        }  else if(typeOfUser === 'driver') {
            const driverLogin = await User.login(email,password);
            const token = createToken(driverLogin._id);
            res.status(200).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/driver' });
        } else if(typeOfUser === 'admin') {
            const adminLogin = await User.login(email,password);
            const token = createToken(adminLogin._id);
            res.status(200).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/admin' });
        } else {
            res.status(200).json({ mssg: 'No type of user is indicated for this user' });
        }

    } catch(err) {
        const error = handleError(err);
        res.status(400).json({ mssg: error });
    }
} 

module.exports.user_forget_password = async (req,res) => {
    const { email } = req.body;

    try {
        const userEmail = User.findOne({ email });

        if(userEmail !== null) {

        }

    } catch(err) {
        console.log(err);
    }

}