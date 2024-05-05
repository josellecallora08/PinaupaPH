import React, { useEffect,useState } from 'react'
import { MdOutlineModeEditOutline, MdOutlineClose} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUnit, fetchUnit } from '../../features/unit';
import apartment from '../../features/apartment';
import EditApartmentUnit from './EditApartmentUnit';


const ApartmentStatusCard = ({apartmentId, val}) => {
  const [isEditApartmentUnit, setIsEditApartmentUnit] = useState(false)
  const toggleisEditApartmentUnit = () => {
    setIsEditApartmentUnit(!isEditApartmentUnit)
  }
  const dispatch = useDispatch()
  const unit = useSelector(state => state.unit.data)
  const loading = useSelector(state => state.unit.loading)

  const handleDelete = (unitId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this apartment?',
    )
    if (isConfirmed) {
      dispatch(deleteUnit(apartmentId, unitId))
    } else {
      console.log('Deletion cancelled')
    }
  }
  return (
    <>
      <div className="relative flex  overflow-hidden shadow-md shadow-gray rounded-lg">
        <div className="text-4xl text-white flex items-center justify-center flex-1 px-5 bg-dark-blue">
          <h1 className='text-4xl font-black'>{val.unit_no}</h1>
        </div>

        <div className="relative pt-8 flex-grow bg-white ">
            <p><span className='text-2xl font-black ml-5'>PHP {val.rent}</span> /per month</p>
            <div className='lg:justify-end lg:mr-5 md:justify-end md:mr-5  lg:mt-14 flex gap-2 mt-16 ml-44 pb-2'>
              <button className='lg:p-2  bg-blue p-1 rounded-md' onClick={toggleisEditApartmentUnit}><MdOutlineModeEditOutline size={15} color='white'/></button>
              <button onClick={() => handleDelete(val._id)} className='lg:p-2  bg-red p-1 rounded-md'><MdOutlineClose size={15} color='white'/></button>
            </div>
            
        </div>
        {val.occupied ? <div className="absolute top-3 -right-9 w-28 h-8 bg-dark-blue text-white p-2 rotate-45">
          <p className="text-xs text-center text-white font-bold uppercase">Rented</p>
        </div> : ''}

        {isEditApartmentUnit && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="lg:w-auto lg:h-auto  mt-12 bg-white rounded-lg">
            <EditApartmentUnit setIsEditApartmentUnit={setIsEditApartmentUnit} />
          </div>
        </div>
      )}
    </div>
    </>

  )
}

export default ApartmentStatusCard