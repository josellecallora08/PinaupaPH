import React from 'react'
import {useDispatch} from 'react-redux'
import { createDocument, generateDocument } from '../../features/documents'
const GenerateContractBtn = ({unit_id = "65af98bb963e98aa3b41b83c", user_id = "65afa2df213f589ebe1f37bc"}) => {
  const dispatch = useDispatch()  
  const unitId = "65af98bb963e98aa3b41b83c"
  const userId = "65afa2df213f589ebe1f37bc"
  const unitNo = 200
  const userName = "Soj"
  const fields = {
    deposit : 6000,
    advance : 1234,
    from_date : 'January 10, 2024',
    to_date : 'March 29, 2024'
  }
  const generateContract = () => {
    dispatch(createDocument(userId, unitId, fields, unitNo, userName))
    // dispatch(createDocument(fields,unitId, userId))
  }
  return (
    <button onClick={generateContract}>Generate Contract</button>
  )
}

export default GenerateContractBtn