import React, { useState } from 'react';
import { payment_url } from '../../utils/constants';

const Apartment = () => { 
  const [intent_id, setIntentId] = useState('')
  const [client_id, setClientId] = useState('')
 
  const handleDetails = async () => {
    const user_id = "65afa2df213f589ebe1f37bc"
    try{
      const response = await fetch(`${payment_url}/create_intent/${user_id}?`, {
        method: "POST"
      })
      if (!response.ok) {
        throw new Error('Unable to create payment method');
      }
      const data = await response.json()
      console.log(data)
      setIntentId(data.data.id)
      setClientId(data.data.attributes.client_key)
    }catch(err){
      console.error('Error:', err.message);
    }
  }
const handlePayment = async (req, res) => {
  const payment_method = "gcash"
  try{
    const url = 'https://api.paymongo.com/v1/payment_methods';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Basic c2tfdGVzdF9OOU1lc2lmczdMcTM1a0NzbXRZN3RuTlA6`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            billing: {
              name: `${'user_response.name'}`,
              email: `${'user_response.email@gmail.com'}`,
              phone: `${'user_response.mobile_no'}`
            },
            type: `${payment_method}`
          }
        }
      })
    };

    const response = await fetch(url, options)
    if(!response) return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Endpoint Problem"})
    const json = await response.json()

    const url1 = `https://api.paymongo.com/v1/payment_intents/${intent_id}/attach`;
    const options1 = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF9OOU1lc2lmczdMcTM1a0NzbXRZN3RuTlA6'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            payment_method: `${json.data.id}`,
            client_key: `${client_id}`,
            return_url: 'http://localhost:5173/dashboard'
          }
        }
      })
    };

    const response1 = await fetch(url1, options1)
    if(!response1) return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Endpoint Problem"})
    const json1 = await response1.json()
    console.log(json1)

    window.open(json1.data.attributes.next_action.redirect.url)
  }
  catch(err){
    console.error('Error:', err.message);
  }
}

  const handleCheckout = async() => {
    try{
      const response = await fetch(`${payment_url}/checkout`, {
        method: 'POST',
        headers:{
          authorization: `Bearer ${'token'}`
        },
        body: JSON.stringify({
          amount: `${'600000'}`
        })
      });

      if (!response.ok) {
        throw new Error('Unable to create payment method');
      }

      const data = await response.json();
      window.open(data.data.attributes.checkout_url)
    }
    catch(err){
      console.error('Error:', err.message);
    }
  }
  return (
    <div>
      <button onClick={handleCheckout}>Checkout again</button>
      <button onClick={handleDetails}>1st</button>
      <br></br>
      <button onClick={handlePayment}>2nde</button>
    </div>
  );
};

export default Apartment;
