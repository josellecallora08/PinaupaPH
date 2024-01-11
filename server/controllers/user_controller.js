const OWNERMODEL = require('../models/owner')
const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const httpStatusCodes = require('../constants/constants')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const createToken = ({id,username, role}) => {
    return jwt.sign({id,username,role}, process.env.SECRET, {expiresIn: "3d"})
}

module.exports.sign_up = async (req, res) => {
    try{
        const {name, username, email, password, mobile_no, birthday} = req.body

        if(await USERMODEL.findOne({username})){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Username already exists"})
        }  
        if(await USERMODEL.findOne({email})){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Email already exists"})
        } 
        if(await USERMODEL.findOne({mobile_no})){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Mobile Number already exists."})
        }
        
        const salt = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(password, salt)
        if(!hashed){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Error hashing the password."})
        }

        const response = await USERMODEL.create({name,username,email,password:hashed,mobile_no,birthday})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Unsuccessful registration. Please try again later."})
        }
        const owner = await OWNERMODEL.create({user_id:response._id})
        if(!owner){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Failed to create Owner Data. Please try again later."})
        }
        const tenant = await TENANTMODEL.create({user_id:response._id})
        if(!tenant){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Failed to create Owner Data. Please try again later."})
        }
        
        // Add apartment and report

        const token = createToken(response._id, response.username, response.role)
        return res.status(httpStatusCodes.OK).json({msg:"Created Account successfully!", role:response.tole, token})
        
    }
    catch(err){
        console.error({error:err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error:err.message})
    }
}

module.exports.sign_in = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        let response = await USERMODEL.findOne({ username });
        if (!response) {
            response = await USERMODEL.findOne({ email: username });
            if (!response) {
                return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Invalid Credentials (temp - Username)" });
            }
        }

        const match = await bcrypt.compare(password, response.password);
        if (!match) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Invalid Credentials (temp - Password)" });
        }

        const token = createToken(response._id, response.username, response.role);

        return res.status(httpStatusCodes.OK).json({ msg: "Login Successfully!", role: response.role, token });
    } catch (err) {
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error..." });
    }
};

module.exports.create_cctv = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, username, password, port, ip_address } = req.body;

        const response = await OWNERMODEL.findOne({ user_id: user_id});

        if (!response) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({ error: "Unable to CCTV Surveillance." });
        }

        const details = { name, username, password, port, ip_address };

        const index = response.cctvs.findIndex(item => item.name.toString() === name);

        if (index === -1) {
            response.cctvs.push(details);
            await response.save();
            return res.status(httpStatusCodes.CREATED).json({ msg: "Successfully added CCTV camera." });
        } else {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "CCTV already exists." });
        }
    } catch (err) {
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error." });
    }
};


module.exports.create_pet = async (req, res) => {
    try{
        const {_id} = req.params
        const {name, image, birthday, species} = req.body;
        const response = await TENANTMODEL.findOne({user_id:_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Invalid to create pet..."}) 
        }
        const details = {name, image, birthday, species}
        const pet_index = response.pet.findIndex(item => item.name.toString() === name)
        if(pet_index === -1){
            response.pet.push(details)
        } else {
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Pet already exists."})
        }

        const saved_response = await response.save();
        if(!saved_response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to save pet information"})
        }
        return res.status(httpStatusCodes.CREATED).json({msg: "Created pet successfully!"})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}

module.exports.create_household = async (req, res) => {
    try{
        const {user_id} = req.params;
        const {name, relationship, birthday, mobile} = req.body;
        const response = await TENANTMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Invalid to create household..."}) 
        }
        const details = {name, relationship, birthday, mobile_no}
        const household_index = response.household.findIndex(item => item.name.toString() === name)
        if(household_index === -1){
            response.household.push(details)
        } else {
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Household already exists."})
        }

        const saved_response = await response.save();
        if(!saved_response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to save household information"})
        }
        return res.status(httpStatusCodes.CREATED).json({msg: "Created household successfully!"})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}


// Change Profile Picture
module.exports.update_profile_picture = async (req, res) => {
    try{
        const {_id, profile_image} = req.body
        let response = await USERMODEL.findByIdAndUpdate(_id,{profile_image})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to change image"})
        }
        return res.status(httpStatusCodes.OK).json({msg: "Profile has been changed"})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: `Server Error: ${err.message}`})
    }
}

module.exports.update_profile = async (req,res) => {
    try{
        const {user_id} = req.params
        const {name, username, email, password, mobile_no, birthday} = req.body;
        let response = await USERMODEL.findById({user_id: user_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to update information"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        if(!hashed){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to update the password"})
        }
        response = await USERMODEL.findByIdAndUpdate(_id, {name, username, email, password:hashed, mobile_no, birthday})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to update information(2)"})
        }
        return res.status(httpStatusCodes.CREATED).json({msg: "Information Updated Successfully!"})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."});
    }
}

module.exports.update_cctv = async (req, res) => {
    try{
        const {user_id, cctv_id} = req.params
        const {name, username, password, port, ip_address} = req.body
        const details = {name, username, password, port, ip_address}
        
        let response = await OWNERMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.UNAUTHORIZED).json({error: "Unable Update Surveillance Information."})
        }
        
        const index = response.cctvs.findIndex(item => item._id.toString() === cctv_id)
        if(index === -1){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to locate CCTV"})
        }
        
        Object.keys(details).forEach(field => {
            if(details[field] !== undefined){
                response.cctvs[index][field] = details[field]
            }
        })

        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: "Successfully Updated!"})
    }
    catch(err){
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error." });
    }
}

module.exports.update_household = async(req, res) =>{
    try{
        const {user_id, household_id} = req.params
        const {name, relationship, birthday, mobile} = req.body
        const details = {name, relationship, birthday, mobile}
        
        const response = await TENANTMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to Update."})
        }
        
        const index = response.household.findIndex((item) => item._id.toString() === household_id)
        if(index === -1){
            return res.status(httpStatusCodes.UNAUTHORIZED.json({error: "Unable to Update Household Information."}))
        }
        Object.keys(details).forEach((detail) => {
            if(details[detail] !== undefined){
                response.household[index][detail] = details[detail]
            }
        })
        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: "Information Updated..."})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}