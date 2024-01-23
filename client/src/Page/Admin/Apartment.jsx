import React, { useState } from 'react';
import { payment_url } from '../../utils/constants';

const Apartment = () => {


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
    </div>
  );
};

export default Apartment;
