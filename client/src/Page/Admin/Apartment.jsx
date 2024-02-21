import React, { useEffect, useState } from 'react';
import { payment_url } from '../../utils/constants';
import { FaPlus } from "react-icons/fa6"; 
import SearchBar from '../../Component/SearchBar'
import ApartmentCard from '../../Component/ApartmentCard';
import AddApartment from '../../Component/AddApartment';
import {useDispatch, useSelector} from 'react-redux'
import { fetchUnits } from '../../features/unit';

const Apartment = () => { 
  const dispatch = useDispatch()
  const unitLoading = useSelector(state => state.unit.loading)
  const unit = useSelector(state => state.unit.data)
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



  
  
   const handleSearch = (e) => {
     setSearchItem(e.target.value);
   }
   const [searchItem, setSearchItem] = useState("")
   const [isAddApartmentFormOpen, setIsAddApartmentFormOpen] = useState(false)
   const toggleAddApartmentForm = () => {
    setIsAddApartmentFormOpen(!isAddApartmentFormOpen);
  }
  console.log(unit)

  return (
    <div className='lg:ml-3 lg:mr-5  '>
    {/* Top of Apartment Tab */}
    <h1 className='lg:text-5xl m-4 my-7 ml-8 text-4xl font-bold'>Apartments Listing </h1>
    <div className='lg:justify-between md:justify-between flex gap-2 w-full mb-5'>
      <SearchBar onSearch={handleSearch} className='lg:w-1/2 flex-1 '/>
      <button onClick={toggleAddApartmentForm} className='lg:w-64 lg:mr-10 lg:text-base md:text-base md:w-56 md:mr-10 w-56 mr-4 px-2  ml-5 text-xs text-white rounded-lg bg-dark-blue flex items-center justify-center gap-2 ' >
        <FaPlus/>
        Add Apartment
      </button>
    </div>
    {/* Body of Tenant Tab */}
    <div className='lg:grid-cols-2 grid grid-cols-1 gap-4 mr-5' >
        <ApartmentCard/>
        <ApartmentCard/>
        <ApartmentCard/>
        <ApartmentCard/>
    </div>
    {isAddApartmentFormOpen && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md'>
          <AddApartment />
        </div>
      </div>
    )}
   

 
    
  </div>
  );
};

export default Apartment;
