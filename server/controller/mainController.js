const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Models
const User = require('../model/User');
const News = require('../model/New');
const Waste = require('../model/Waste');
const Admin = require('../model/Admin');
const Announcement = require('../model/Announcement');
const Feedback = require('../model/Feedback');
const Collector = require('../model/Collector');
const Schedule = require('../model/Schedule');

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

    if(err.message === 'This username doesn\'t exist') {
        errMssg = 'Your username is incorrect, please check your username';
    }

    if(err.code === 11000 && err.keyPattern.userName === 1) {
        errMssg = 'This username is already in use, please choose another username';
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
        console.log('There is no user found with this id');
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
            if(checkUserType.isApproved) {
                const customerLogin = await User.login(email,password);
                const token = createToken(customerLogin._id);
                res.status(200).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: `Hi ${checkUserType.userName}, welcome to Wisetruck App`, redirect: '/', customerDetails: checkUserType, token });
            } else {
                res.status(400).json({ mssg: `${checkUserType.email} is not yet approved by admin. Please contact your administrator` })
            }
            
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

module.exports.reject_user = async (req,res) => {
    const { id } = req.body;
    console.log

    try {
        const userFind = await User.findById(id);
        const info = await transporter.sendMail({
            from: `'Wisetruck App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${userFind.email}`,
            subject: 'Account Rejected | Wisetruck App',
            html:  `
            <h1>Hello ${userFind.firstName} ${userFind.lastName}</h1>
            <p>This is to notify you that you have been rejected by the admin</p>
        
            <p>Please contact your administrator for more information, thank you.</p>
            `
        });
        console.log(info);
        res.status(200).json({ mssg: `${userFind.firstName} has been rejected!`, redirect:'/admin' });
    } catch(err) {
        console.log(err.message);
    }
}

module.exports.approve_user = async (req,res) => {
    const { id } = req.params;
   
    try {
        const userFind = await User.findById(id);
        const data = await User.updateOne({ _id: id }, { isApproved: true });
        const info = await transporter.sendMail({
            from: `'Wisetruck App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${userFind.email}`,
            subject: 'Account Approved | Wisetruck App',
            html:  `
            <h1>Hello ${userFind.firstName} ${userFind.lastName}</h1>
            <p>This is to notify you that you have been approved by the admin</p>
        
            <p>You can now login to your account, thank you.</p>
            `
        });
        console.log(info);
        res.status(200).json({ mssg: `${userFind.firstName} has been approved, email has been sent to user`, redirect:'/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_admin = async (req,res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_admin_detail = async (req,res) => {

    const { id } = req.params;

    try {  
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch(err) {
        console.log('There is no user found with this id');
    }
}

module.exports.post_admin = async (req,res) => {
    const { firstName, lastName, userName, password, confirmPassword, province, barangay, city } = req.body;

    try {
        if(password === confirmPassword) {
            const createAdmin = await Admin.create({ firstName, lastName, userName, password, province, barangay, municipality: city });
            res.status(200).json({ mssg: `Thank you for signing up ${userName}`, redirect:'/admin/login' });
        } else {
            res.status(200).json({mssg: `Password does not match, please check password`});
        }

    } catch(err) {
        const uniqueErr = handleError(err);
        res.status(400).json({ mssg: uniqueErr });
    }

}

module.exports.admin_login = async (req,res) => {
    const { userName,password } = req.body;

    // Check user type

    try {
        const adminDetails = await Admin.findOne({ userName });
        const adminLogin = await Admin.login(userName,password);
        const token = createToken(adminLogin._id);
        res.status(200).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: `Hi ${adminDetails.userName}, welcome to Wisetruck Admin Page!`, redirect: '/admin', token, adminDetails });
    } catch(err) {
        const error = handleError(err);
        res.status(400).json({ mssg: error });
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
    const photo = req.file.filename;

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
        res.status(200).json({ mssg: `${newsTitle.title} has been deleted successfully`, redirect:'/admin' });
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
    const photo = req.file.filename;

    try {
        const waste = await Waste.create({ name, photo, description, specialInstruction, bestOption,typeOfWaste});
        res.status(200).json({ mssg: `${name} has been posted to waste lists`, redirect:'/admin' });
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
    //const photo = req.file.filename
    

    try {
        const waste = await Waste.updateOne({ _id:id },{ name, description, specialInstruction, bestOption,typeOfWaste });
        res.status(200).json({ mssg: `${name} has been updated successfully`,redirect: '/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_announcement = async (req,res) => {
    try {
        const announcement = await Announcement.findOne().sort({createdAt: -1});
        res.status(200).json(announcement);
    } catch(err) {
        console.log(err);
    }
}

module.exports.post_announcement = async (req,res) => {
    const { description } = req.body;

    try {
        const announce = await Announcement.create({ description });
        res.status(200).json({ mssg: 'Announcement has been created', redirect:'/admin' });
    } catch(err) {
        console.log(err);
    }

}

module.exports.update_announcement = async (req,res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const announce = await Announcement.updateOne({ _id: id }, { description });
    } catch(err) {
        console.log(err);
    }
}

module.exports.delete_announcement = async(req,res) => {
    const { id } = req.params;

    try {
        const announce = await Announcement.deleteOne({ _id:id });
        res.status(200).json({ mssg:'Announcement has been deleted', redirect: '/admin' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_feedback = async (req,res) => {
    
    try {
        const feedback = await Feedback.find().populate('user_id');
        res.status(200).json(feedback);
    } catch(err) {
        console.log(err);
    }
}

module.exports.post_feedback = async (req,res) => {
    const { id: user_id,feedback } = req.body;
    
    try {
        const feeds = await Feedback.create({ user_id,feedback });
        res.status(200).json({ mssg: 'Feedback has been created', redirect:'/' });
    } catch(err) {
        consol.log(err);
    }
}

// Collector Controllers
module.exports.get_collector = async (req,res) => {
    try {
        const collector = await Collector.find();
        res.status(200).json(collector);
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_collector_detail = async (req,res) => {

    const { id } = req.params;

    try {  
        const collector = await Collector.findById(id);
        res.status(200).json(collector);
    } catch(err) {
        console.log('There is no collector found with this id');
    }
}

module.exports.post_collector = async (req,res) => {
    const { firstName, lastName, userName, password, confirmPassword, province, barangay, city } = req.body;

    try {
        if(password === confirmPassword) {
            const createCollector = await Collector.create({ firstName, lastName, userName, password, province, barangay, municipality: city });
            res.status(200).json({ mssg: `Thank you for signing up ${userName}`, redirect:'/collector/login' });
        } else {
            res.status(200).json({mssg: `Password does not match, please check password`});
        }

    } catch(err) {
        const uniqueErr = handleError(err);
        res.status(400).json({ mssg: uniqueErr });
    }

}

module.exports.collector_login = async (req,res) => {
    const { userName,password } = req.body;

    // Check user type

    try {
        const collectorDetails = await Collector.findOne({ userName });
        const collectorLogin = await Collector.login(userName,password);
        const token = createToken(collectorLogin._id);
        res.status(200).cookie('collectorJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: `Hi ${collectorDetails.userName}, welcome to Wisetruck Collector page`, redirect: '/collector', token, collectorDetails });
    } catch(err) {
        const error = handleError(err);
        res.status(400).json({ mssg: error });
    }
}

module.exports.get_schedule = async (req,res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch(err) {
        console.log(err);
    }
}

module.exports.get_schedule_detail = async (req,res) => {
    const { id } = req.params;

    try {
        const schedules = await Schedule.findById(id);
        res.status(200).json(schedules);
    } catch(err) {
        console.log(err);
    }
}

module.exports.post_schedule = async (req,res) => {
    const { barangay,dateInputFormat } = req.body;
    let year = ''
    let date = ''
    let month = ''
    
    // 20230812
    for(let i = 0; i < dateInputFormat.length; i++) {
        if(i < 4) {
            year += dateInputFormat[i];
        }

        if(i > 3 && i < 6) {
            month += dateInputFormat[i];
        }

        if(i > 5) {
            date += dateInputFormat[i];
        }
    }
    const dateFormat = `${year}-${month}-${(Number(date) + 1) < 10 ? `0${Number(date) + 1}` : Number(date) + 1 }`;

    try {
        const schedule = await Schedule.create({ barangay,collectionDate: dateFormat });
        res.status(200).json({ mssg: `Schedule for barangay ${barangay} has been set.`,redirect: '/admin'});
    } catch(err) {
        // if(err.code === 1100) {
        //     res.status(400).json({ mssg: 'Scheduc' });
        // }
        // Create validation to not repeat if barangay has been scheduled within the day
        console.log(err);
    }

}