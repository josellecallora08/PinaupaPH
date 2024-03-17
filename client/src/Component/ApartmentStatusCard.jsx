import React, { useEffect } from 'react'
import { MdOutlineModeEditOutline, MdOutlineClose} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnit } from '../features/unit';
import apartment from '../features/apartment';


const ApartmentStatusCard = ({apartmentId, unitId}) => {
  const dispatch = useDispatch()
  const unit = useSelector(state => state.unit.data)
  const loading = useSelector(state => state.unit.loading)
  useEffect(() => {
    dispatch(fetchUnit(apartmentId, unitId))
  }, [dispatch, loading])
  return (
    <>
      <div className="relative flex  overflow-hidden shadow-md shadow-gray rounded-lg">
        <div className="text-4xl text-white flex items-center justify-center flex-1 px-5 bg-dark-blue">
          <h1 className='text-4xl font-black'>405</h1>
        </div>

        <div className="relative pt-8 flex-grow bg-white ">
            <p><span className='text-2xl font-black ml-5'>PHP 10,000</span>/per month</p>
            <div className='lg:justify-end lg:mr-5 md:justify-end md:mr-5  lg:mt-14 flex gap-2 mt-16 ml-44 pb-2'>
              <button className='lg:p-2  bg-blue p-1 rounded-md'><MdOutlineModeEditOutline size={15} color='white'/></button>
              <button className='lg:p-2  bg-red p-1 rounded-md'><MdOutlineClose size={15} color='white'/></button>
            </div>
            
        </div>
        <div className="absolute top-3 -right-9 w-28 h-8 bg-dark-blue text-white p-2 rotate-45">
          <p className="text-xs text-center text-white font-bold uppercase">Rented</p>
        </div>
    </div>
    </>

  )
}

export default ApartmentStatusCard