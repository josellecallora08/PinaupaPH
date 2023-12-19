const mongoose = require('mongoose')

const UNITMODEL = new mongoose.Schema({
    unit_id:{
        type:String,
        unique:true,
        default: function () {
            // Use the first letter of each word in the apartment building name
            // and concatenate it with an ObjectId
            const initials = this.name
                .split(' ')
                .map(word => word[0])
                .join('');
            
            return `${initials}-${mongoose.Types.ObjectId()}`;
        }
    },
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
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USERMODEL'
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