const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Models
const User = require('../model/User');
const News = require('../model/New');
const Waste = require('../model/Waste');

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
    const { firstName,lastName,middleName,phoneNumber,email,isApproved,typeOfUser,province,barangay,city: municipality,password,confirmPassword } = req.body;

    const validId = req.file.filename;

    try {
        if(password === confirmPassword) {
            const createUser = await User.create({ firstName,lastName,middleName,phoneNumber,email,isApproved,validId,typeOfUser,province,barangay,municipality,password });
            res.status(200).json({ mssg: `Thank you for signing up ${firstName}, please wait for approval`, redirect:'/login' });
        } else {
            res.status(200).json({mssg: `Password does not match, please check password`});
        }

    } catch(err) {
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
            res.status(200).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/', customerDetails: checkUserType, token });
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
    const code = Math.floor(Math.random() * 100000);
    
    try {
        const user = await User.findOne({ email });
       
        if(user) {
            const userCode = await User.updateOne({ _id: user._id },{ verificationCode: code });
            const info = await transporter.sendMail({
                from: `'WiseTruck' <${process.env.MAIL_ACCOUNT}>`,
                to: `${user.email}`,
                subject: 'Wisetruck App | Forgot Password',
                html:  `
                <h1>Hello ${user.firstName} ${user.lastName}</h1>
                <p>Here is your code: <b>${code}</b></p>
            
                <p>Thank you for registering!</p>
                `
            });
            console.log(info);
            res.status(200).json({ redirect: `/verification/${user._id}`, mssg: `${user.email} has found, redirecting to verification page` })
        } else {
            res.status(400).json({ mssg: `${email} cannot be found in the system, please check email` });
        }

    } catch(err) {
        console.log(err);
    }

}

module.exports.user_verify_code = async (req,res) => {
    const { id,code } = req.body;

    try {
        const checkId = await User.findById(id);

        if(checkId.verificationCode === Number(code)) {
            res.status(200).json({ mssg: 'Redirecting to update password', redirect: `/update/password/${id}` });
        } else {
            res.status(400).json({ mssg: 'Verification code does not match, please double check your email' });
        }

    } catch(err) {
        console.log(err);
    }
}

module.exports.user_update_password = async (req,res) => {
    const { id,password,confirmPassword } = req.body;

    try {
        const user = await User.findById(id);
        const isOldSameWithNew = await bcrypt.compare(password, user.password);
        
        if(!isOldSameWithNew) {
            if(password === confirmPassword && password.length >= 8) {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password,salt);
            
                const data = await User.updateOne({ _id: id },{ password: hashedPassword });
                res.status(200).json({ redirect: '/login', mssg: 'Your password has been changed!' });
            } else {
                if(password !== confirmPassword) {
                    res.status(400).json({ mssg: 'Password does not match, please check your password' });
                } 

                if(password.length < 8) {
                    res.status(400).json({ mssg: 'Password must be greater than 8 characters' });
                }
            }
        } else {
            res.status(400).json({mssg: 'You cannot use your old password repetitively'});
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_news = async(req,res) => {
    try {
        const allNews = await News.find();
        res.status(200).json(allNews);
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_news_detail = async (req,res) => {
    const { id } = req.params;

    try {
        const news = await News.findById(id);
        res.status(200).json(news);
    } catch(err) {
        console.log(err);
    }
}

module.exports.post_news = async(req,res) => {
    const { title, description } = req.body;
    const photo = 'photo to';

    try {
        const news = await News.create({ title,photo,description });
        res.status(200).json({ mssg: `${title} has been posted to newsfeed`, redirect:'/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.delete_news = async(req,res) => {
    const { id } = req.params;

    try {
        const newsTitle = await News.findById(id);
        const news = await News.deleteOne({ _id: id });
        res.status(200).json({ mssg: `${newsTitle} has been deleted successfully`, redirect:'/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.update_news = async (req,res) => {
    const { id } = req.params;
    const { title,description } = req.body;
    const photo = 'photo to'

    try {
        const news = await News.updateOne({ _id:id },{ title,photo,description });
        res.status(200).json({ mssg: `${title} has been updated successfully`,redirect: '/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_waste = async (req,res) => {
    try {
        const wastes = await Waste.find();
        res.status(200).json(wastes);
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_waste_detail = async (req,res) => {
    const { id } = req.params;

    try {
        const waste = await Waste.findById(id);
        res.status(200).json(waste);
    } catch(err) {
        console.log(err);
    }
}

module.exports.post_waste = async(req,res) => {
    const { name, description, specialInstruction, bestOption,typeOfWaste } = req.body;
    const photo = 'photo to';

    try {
        const waste = await Waste.create({ name, photo, description, specialInstruction, bestOption,typeOfWaste});
        res.status(200).json({ mssg: `${name} has been posted to wastes`, redirect:'/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.delete_wastes = async(req,res) => {
    const { id } = req.params;

    try {
        const waste = await Waste.deleteOne({ _id: id });
        res.status(200).json({ mssg: 'Waste has been deleted successfully', redirect:'/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.update_waste = async (req,res) => {
    const { id } = req.params;
    const { name, description, specialInstruction, bestOption,typeOfWaste } = req.body;
    const photo = 'photo to'

    try {
        const waste = await Waste.updateOne({ _id:id },{ name, photo, description, specialInstruction, bestOption,typeOfWaste });
        res.status(200).json({ mssg: `${name} has been updated successfully`,redirect: '/admin' });
    } catch(err) {
        console.log(err);
    }
}