const httpStatusCodes = require('../constants/constants');

module.exports.checkout = async (req, res) => {
    const {amount} = req.body
    try{
        const url = 'https://api.paymongo.com/v1/checkout_sessions';
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`
          },
          body: JSON.stringify({
            data: {
              attributes: {
                send_email_receipt: true,
                show_description: true,
                show_line_items: true,
                cancel_url: 'http://localhost:5173',
                description: 'Apartment Rental Fee',
                line_items: [
                  {
                    currency: 'PHP',
                    amount: 600000,
                    description: 'Rent',
                    name: 'Rent Fee',
                    quantity: 1
                  }
                ],
                success_url: 'http://localhost:5173/dashboard',
                payment_method_types: ['gcash', 'paymaya','grab_pay','dob','card','billease','dob_ubp']
              }
            }
          })
        };
        
        const response = await fetch(url, options)
        const json = await response.json();
    
        // Handle the JSON response (e.g., log specific details)
        console.log('Payment Method Response:', json);

        // Send a response to the client if needed
        res.status(httpStatusCodes.OK).json(json);
    }
    catch(err){
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server Error' });
    }
}