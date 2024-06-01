import React from 'react'
import { MdCloudDownload } from 'react-icons/md'
const TenantMobileTrans = () => {
  return (
    <div>
      <div>
        <div className="flex h-20 mt-5 items-center rounded-lg mx-4 shadow-md shadow-gray relative overflow-hidden">
          <div
            className={`flex items-center justify-center bg-red rounded-tl-lg rounded-bl-lg h-full min-w-[90px] text-center text-xl font-bold p-3 text-white capitalize`}
          >Unpaid</div>
          <div className="flex w-full gap-2 justify-between px-4 items-center overflow-hidden">
            <div className="flex flex-col text-lg overflow-hidden">
              <div className="font-semibold text-left text-xs truncate">INV103123123</div>
              <div className="font-regular text-left text-xs truncate">
                Unit-101
                <span className="capitalize text-xs">GCASH</span>
              </div>
            </div>
            <div className="text-right text-xs">
              <div className="font-extralight truncate">January 01</div>
              <div className="font-bold truncate">Php 20,000</div>
            </div>
          </div>
          <div className="hover:duration-500 cursor-pointer absolute top-0 right-0 h-full max-w-[90px] flex items-center justify-center pr-4 text-white opacity-0 transition-opacity hover:bg-primary-color hover:opacity-100">
            <span className="text-xs ml-5">Download</span>
            <MdCloudDownload className="text-lg ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenantMobileTrans
