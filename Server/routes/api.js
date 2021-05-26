const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const mongoose = require('mongoose');
const db = 'mongodb+srv://userChandru:passwordChandru@cluster0.7gpae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(db, err => {
    if(err){
        console.log('error', err);
    }else{
        console.log('Connected to DB successfully!!')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.autherization){
       return res.status(401).send('Unauthorized Request');
    }
    let token = req.headers.autherization.split(' ')[1];
    if(token===null){
        return res.status(401).send('Unautherized Request');
    }
    let payload = jwt.verify(token, 'secretkey');
    if(!payload){
        return res.status(401).send('Unauthorized Request');
    }
    console.log(payload)
    req.userId = payload.subject;
    next()

}

router.get('/', (req,res) =>{
    res.send('from API route')
})

router.post('/register', (req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    // User.findOne({email: userData.email}, (error, user)=>{
    //     if(error){
    //         console.log(error)
    //     } else if(user){
    //     res.send('Email exists try login')
    //     }
    // })
        user.save((error, registeredUser) =>{
            if(error){
                console.log(error);
            }else{
                let payload = { subject: registeredUser._id}
                let token = jwt.sign(payload, 'secretkey');
                res.status(200).send({token});
            }
        })
    
})

router.post('/login', (req,res)=>{
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user)=>{
        if(error){
            console.log(error)
        }else{
        
        if(!user){
            res.status(401).send('Invalid Email');
        } else if(userData.password !== user.password){
            res.status(401).send('Invalid Password');
        }else{
            let payload = { subject: user._id};
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
        }
    }
    })
})

router.get('/events', (req,res)=>{
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },{
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },{
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },{
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        }
    ]
    res.json(events)
})

router.get('/special',verifyToken, (req,res)=>{
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },{
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },{
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        },{
            "_id": "3",
            "name": "Auto Expo",
            "description": "Lorem epso",
            "date": "24-may-2021"
        }
    ]
    res.json(events)
})
module.exports = router;

