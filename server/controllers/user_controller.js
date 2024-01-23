const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const httpStatusCodes = require('../constants/constants')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const createToken = ({id,username, role}) => {
    return jwt.sign({id,username,role}, process.env.SECRET, {expiresIn: "3d"})
}
module.exports.search_bar = async(req, res) => {

    try{

    }
    catch(err){

    }
}

module.exports.fetch_user = async (req, res) => {
    const _id = req.user._id
    const response = await USERMODEL.findById(_id)
    try{
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
        }
        return res.status(httpStatusCodes.OK).json({msg: "User found", response})
    }
    catch(err){
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error..." });
    }
}

module.exports.sign_up = async (req, res) => {
    const {name, username, email, password, mobile_no, birthday, unit_id, deposit} = req.body

    try{
        if(await USERMODEL.findOne({username})) 
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Username already exists"})
        if(await USERMODEL.findOne({email})) 
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Email already exists"}) 
        if(await USERMODEL.findOne({mobile_no})) 
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Mobile Number already exists."})
        
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        if(!hashed) 
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Error hashing the password."})

        const response = await USERMODEL.create({name,username,email,password:hashed,mobile_no,birthday})
        if(!response)
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Unsuccessful registration. Please try again later."})
                
        if(response.role === "Tenant"){
            const tenant = await TENANTMODEL.create({user_id:response._id, unit_id: unit_id, deposit})
            if(!tenant)
                return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Failed to create Tenant Data. Please try again later."})
        }
        
        // Add apartment and report

        const token = createToken(response._id, response.username, response.role)
        return res.status(httpStatusCodes.OK).json({msg:"Created Account successfully!", response, token})
    }
    catch(err){
        console.error({error:err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error:err.message})
    }
}

module.exports.sign_in = async (req, res) => {
    const { username, password } = req.body;
    try {
        let response = await USERMODEL.findOne({ username });
        if (!response) {
            response = await USERMODEL.findOne({ email: username });
            if (!response) 
                return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Invalid Credentials (temp - Username)" });
        }

        const match = await bcrypt.compare(password, response.password);
        if (!match) 
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "Invalid Credentials (temp - Password)" });

        const token = createToken(response._id, response.username, response.role);
        return res.status(httpStatusCodes.OK).json({ msg: "Login Successfully!", response, token });
    } catch (err) {
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error..." });
    }
};




module.exports.create_pet = async (req, res) => {
    try{
        const {user_id} = req.params
        const {name, birthday, species} = req.body;
        const response = await TENANTMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Invalid to create pet..."}) 
        }
        const details = {name, birthday, species}
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
        const details = {name, relationship, birthday, mobile}
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

module.exports.update_pet = async (req, res) => {
    try{
        const {user_id, pet_id} = req.params
        const {name, birthday, species } = req.body
        const details = {name, birthday, species}

        const response = await TENANTMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.UNAUTHORIZED).json({error: "Unable to Update Information..."})
        }

        const index = response.pet.findIndex(item => item._id.toString() === pet_id)
        if(index === -1){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to Locate Pet"})
        }
        Object.keys(details).forEach(item => {
            if(details[item] !== ""){
                response.pet[index][item] = details[item]
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

module.exports.delete_tenant = async (req, res) => {
    try{
        const {user_id} = req.params
        
        const response = await USERMODEL.findByIdAndDelete({_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found..."})
        }
        if(response.role === "Tenant"){
            await TENANTMODEL.findOneAndDelete({user_id:user_id})
        }
        return res.status(httpStatusCodes.OK).json({msg: "Removed Successfully..."})
    }  
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}


module.exports.delete_household = async(req, res) => {
    try{
        const {user_id, household_id} = req.params
        const response = await TENANTMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
        }
        const index = response.household.findIndex(item => item._id.toString() === household_id)
        if(index === -1){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "Unable to locate household"})
        }
        response.household.splice(index, 1)
        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: "Removed household"})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.delete_pet = async(req, res) => {
    try{
        const {user_id, pet_id} = req.params
        const response = await TENANTMODEL.findOne({user_id:user_id})
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
        }
        const index = response.pet.findIndex(item => item._id.toString() === pet_id)
        if(index === -1){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "Pet not found"})
        }
        response.pet.splice(index, 1)
        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: "Removed Pet"})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error."})
    }
}