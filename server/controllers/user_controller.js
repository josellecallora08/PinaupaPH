const OWNERMODEL = require('../models/owner')
const TENANTMODEL = require('../models/tenant')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = ({_id,username, role}) => {
    return jwt.sign({_id,username,role}, process.env.SECRET, {expiresIn: "3d"})
}

module.exports.signup = async (req, res) => {
    try{
        const {name, username, email, password, mobile_no, birthday} = req.body

        if(await TENANTMODEL.findOne({username})){
            res.status(400).json({error:"Username already exists"})
        }  
        if(await TENANTMODEL.findOne({email})){
            res.status(400).json({error:"Email already exists"})
        } 
        if(await TENANTMODEL.findOne({mobile_no})){
            res.status(400).json({error:"Mobile Number already exists."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        if(!hashed){
            res.status(400).json({error:"Error hashing the password."})
        }

        const response = await TENANTMODEL.create({name,username,email,password:hashed,mobile_no,birthday})
        if(!response){
            res.status(400).json({msg:"Unsuccessful registration. Please try again later."})
        }
    
        const token = createToken(response._id, response.username, response.role)
        res.status(201).json({msg:"Logged in successfully!", role:response.tole, token})
        
    }
    catch(err){
        console.error({error:err.message})
        res.status(500).json({error:err.message})
    }
}

module.exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        let user_response = await OWNERMODEL.findOne({ username });
        if (!user_response) {
            user_response = await TENANTMODEL.findOne({ email: username });
            if (!user_response) {
                return res.status(400).json({ error: "Invalid Credentials (temp - Username)" });
            }
        }

        const match = await bcrypt.compare(password, user_response.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid Credentials (temp - Password)" });
        }

        const token = createToken(user_response._id, user_response.username, user_response.role);

        res.status(201).json({ msg: "Login Successfully!", role: user_response.role, token });
    } catch (err) {
        console.error({ error: err.message });
        res.status(500).json({ error: "Server Error..." });
    }
};

module.exports.admin_update_profile = async (req,res) => {
    try{
        const {name, username, password, birthday, mobile_no} = req.body;
        
    }
    catch(error){

    }
}

