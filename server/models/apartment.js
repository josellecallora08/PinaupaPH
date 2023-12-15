const {mongoose} = require('mongoose')

const UNITMODEL = new mongoose.Schema({
    occupied:{
        type:Boolean,
        default:false
    },
    monthly_rent:{
        type:Number
    },
    unit_no:{
        type:String
    }
},{timestamps: true})

const APARTMENTMODEL = new mongoose.Schema({
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OWNERMODEL'
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    subdivision:{
        type:String,
    },
    units:[UNITMODEL],

},{timestamps: true})

module.exports = mongoose.model('apartment', APARTMENTMODEL)