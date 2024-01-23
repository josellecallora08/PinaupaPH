const httpStatusCodes = require('../constants/constants')


module.exports.createIntent = async(req, res) => {
    try{
    const url = 'https://api.paymongo.com/v1/payment_intents';
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`
    },
    body: JSON.stringify({
        data: {
        attributes: {
            amount: 50000,
            payment_method_allowed: ['atome', 'card', 'dob', 'paymaya', 'billease', 'gcash', 'grab_pay'],
            payment_method_options: {card: {request_three_d_secure: 'any'}},
            currency: 'PHP',
            capture_type: 'automatic',
            description: 'Apartment Fee',
            statement_descriptor: 'Rent Fee'
        }
        }
    })
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(async (json) => console.log(json))
    .catch(err => console.error('error:' + err));
    }
    catch(err){
        console.error({error: err.message})
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Server Error"})
    }
}