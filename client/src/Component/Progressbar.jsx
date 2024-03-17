import React from 'react'
import { Progress } from 'flowbite-react'
import rent from '/Rent.svg'
import occupancy from '/occupancy.svg'
import renew from '/Renew.svg'
import pay from '/PayDate.svg'

const Progressbar = () => {
  return (
    <div className="lg:w-full lg:mt-4  lg:gap-x-24 lg:gap-y-2 grid grid-cols-2 gap-1">
      <div className=" min-[1440px]:w-[21em] lg:w-[18.125em]  flex flex-col bg-white items-center gap-2 w-full px-3 py-4 rounded-md shadow-sm shadow-dark-gray ">
        <div className='lg:-ml-36 md:-ml-48 -ml-24'>
          <p className="lg:text-xl lg:font-bold md:text-xl text-xs  text-gray-800">Total Paid</p>
        </div>
        <div className='flex items-center w-full justify-evenly'>
          <div className="lg:p-2 rounded-full bg-dark-gray p-1">
            <img src={rent} alt="" className="w-9 p-1" />
          </div>

          <div className="w-1/2">
            <div className="lg:text-xl md:text-xl text-sm text-gray-800 font-bold w-full">Php 10,000</div>
            <Progress
              progress={10}
              progressLabelPosition="inside"
              textLabelPosition="outside"
              size="md"
              color="blue"
            />
          </div>
        </div>
      </div>
      <div className="min-[1440px]:w-[21em] lg:w-[18.125em] flex flex-col bg-white items-center gap-2 w-full px-3 py-4 rounded-md shadow-sm shadow-dark-gray ">
        <div className=' lg:-ml-24 -ml-14'>
          <p className="lg:text-xl lg:font-bold md:text-xl text-xs">Occupancy Rate</p>
        </div>
        <div className='flex items-center w-full justify-evenly'>
          <div className="lg:p-2 rounded-full bg-dark-gray p-1">
            <img src={occupancy} alt="" className=" p-1 w-9" />
          </div>

          <div className="w-1/2">
            <div className="lg:text-xl md:text-xl text-sm text-gray-800 font-bold w-full">90%</div>
            <Progress
              progress={10}
              progressLabelPosition="inside"
              textLabelPosition="outside"
              size="md"
              color="blue"
            />
          </div>
        </div>
      </div>
      <div className="min-[1440px]:w-[21em] lg:w-[18.125em] flex flex-col bg-white items-center gap-2 w-full px-3 py-4 rounded-md shadow-sm shadow-dark-gray ">
        <div className='lg:-ml-24 -ml-14'>
          <p className="lg:text-xl lg:font-bold md:text-xl text-xs ">Deliquency Rate</p>
        </div>
        <div className='flex items-center w-full justify-evenly'>
          <div className=" lg:p-2 rounded-full bg-dark-gray p-1 ">
            <img src={pay} alt="" className="w-9" />
          </div>

          <div className="w-1/2">
            <div className="lg:text-xl md:text-xl text-sm text-gray-800 font-bold w-full">100%</div>
            <Progress
              progress={100}
              progressLabelPosition="inside"
              textLabelPosition="outside"
              size="md"
              color="blue"
            />
          </div>
        </div>
      </div>
      <div className="min-[1440px]:w-[21em] lg:w-[18.125em] flex flex-col bg-white items-center gap-2 w-full px-3 py-4 rounded-md shadow-sm shadow-dark-gray ">
        <div className='lg:-ml-24 -ml-14'>
          <p className="lg:text-xl lg:font-bold md:text-xl text-xs">Renewal Rate</p>
        </div>
        <div className='flex items-center w-full justify-evenly'>
          <div className="lg:p-2 rounded-full bg-dark-gray p-1">
            <img src={renew} alt="" className="p-1 w-9" />
          </div>

          <div className="w-1/2">
            <div className="lg:text-xl md:text-xl text-sm text-gray-800 font-bold w-full">93.5%</div>
            <Progress
              progress={93.5}
              progressLabelPosition="inside"
              textLabelPosition="outside"
              size="md"
              color="blue"
            />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Progressbar
