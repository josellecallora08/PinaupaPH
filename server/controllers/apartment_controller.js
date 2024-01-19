const APARTMENTMODEL = require('../models/apartment')
const TENANTMODEL = require('../models/tenant')
const OWNERMODEL = require('../models/owner')
const USERMODEL = require('../models/user')
const httpStatusCodes = require('../constants/constants')

module.exports.fetch_apartment = async (req, res) => {
    try{
        const response = await APARTMENTMODEL.find()
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to fetch apartment"})
        }
        return res.status(httpStatusCodes.OK).json(response)
    }
    catch(err){
        console.error({error:err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.fetch_apartment_units = async (req, res) => {
    try{
        const {apartment_id} = req.params;
        let response = await APARTMENTMODEL.findOne({_id:apartment_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to find Apartment Building"})
        }
        const units = response.units

        return res.status(httpStatusCodes.OK).json(units)
    }
    catch(err){
        console.error({error:err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.create_apartment = async (req, res) => {
    try{
        const {name, address, province, barangay} = req.body
        if(await APARTMENTMODEL.findOne({name})){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Apartment Building Exists"})
        }
        let response = await APARTMENTMODEL.create({name,address,province,barangay})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error:"Unable to create apartment building..."})
        }
        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: "Apartment Building Created..."})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.create_apartment_unit = async (req, res) => {
    try{
        const {apartment_id} = req.params
        const {rent, unit_no} = req.body
        const details = {rent, unit_no}

        const response = await APARTMENTMODEL.findOne({_id:apartment_id})
        if(!response){
            return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to find Apartment Id"})
        }
        const index = response.units.findIndex(item => item.unit_no.toString() === unit_no)
        if(index === -1){
            response.units.push(details)
            await response.save()
            return res.status(httpStatusCodes.CREATED).json({msg: "Created Apartment Unit"})
        } else {
            return res.status(httpStatusCodes.FOUND).json({error: "Apartment Unit Exists."})
        }
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.edit_apartment = async (req, res) => {
    try{
        const {apartment_id} = req.params
        const {name, address, province, barangay} = req.body
        const details = {name, address, province, barangay}
        const response = await APARTMENTMODEL.findByIdAndUpdate({_id:apartment_id},details)
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "Apartment Not Found"})
        }
        await response.save()
        return res.status(httpStatusCodes.CREATED).json({msg: `Edited ${name}`})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.edit_apartment_unit = async (req, res) => {
    try{
        const {apartment_id, unit_id} = req.params
        const {unit_no, rent} = req.body
        const details = {unit_no, rent} 

        const response = await APARTMENTMODEL.findOne({_id:apartment_id})
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: `Apartment Not Found`})
        }
        const index = response.units.findIndex(item => item._id.toString() === unit_id)
        if(index === -1){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: `Apartment Unit ${unit_no} Not Found`})
        } 
        Object.keys(details).forEach(item => {
            if(details[item] !== ""){
                response.units[index][item] = details[item] 
            }
        })
        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: `Updated ${response.units[index].unit_no}`})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.delete_apartment = async (req, res) => {
    try{
        const {apartment_id} = req.params
        const response = await APARTMENTMODEL.findByIdAndDelete({_id:apartment_id})
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: `Unable to remove apartment building`})
        }
        return res.status(httpStatusCodes.OK).json({msg: `Apartment building Deleted`})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}

module.exports.delete_apartment_unit = async (req, res) => {
    try{
        const {apartment_id, unit_id} = req.params
        const response = await APARTMENTMODEL.findById({_id:apartment_id})
        if(!response){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: "Apartment Not Found"})
        }
        const index = response.units.findIndex(item => item._id.toString() === unit_id)
        if(!index){
            return res.status(httpStatusCodes.NOT_FOUND).json({error: `Apartment Unit Not Found`})
        }
        response.units.splice(0, index)
        await response.save()
        return res.status(httpStatusCodes.OK).json({msg: `Deleted Unit`})
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error..."})
    }
}
