const REPORTMODEL = require('../models/report')
const TENANTMODEL = require('../models/tenant')
const OWNERMODEL = require('../models/owner')

module.exports.report = async (req, res) => {
    try{
        const {unit_id, tenant_id, title, description, type} = req.body;
        const response = await REPORTMODEL.create({unit_id, tenant_id, title, description, type});
        if(!response){
            res.status(400).json({error: "Failed to report an issue"});
        }
        res.status(200).json({msg: "Report submitted successfully"});
    }   
    catch(err){
        console.error({error:err.message});
        res.status(500).json({error: `Server Error: ${err.message}`});
    }
}

module.exports.comment = async (req, res) => {
    try{
        const {_id, description} = req.body
        let response = await OWNERMODEL.findByIdAndUpdate(_id,{description})
        if(!response){
            response = await TENANTMODEL.findByIdAndUpdate(_id,{description})
        }
    
        res.status(200).json({msg: "Made a comment."})
    }
    catch(err){
        res.status(500).json({error:`Server Error: ${err.message}`})
    }
}