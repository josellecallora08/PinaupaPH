import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import angle from '/angle.svg'
import send from '/send.svg'
import comments from '/comments.svg'
import pfp from '/pfp.svg'
import sample from '/background.jpg'
import { useDispatch, useSelector } from 'react-redux'
const ViewConcern = () => {
const {id} = useParams()
const dispatch = useDispatch()
const report = useSelector((state) => state.report.single)  
const comment = useSelector((state) => state.comment.data)
const messageContainerRef = useRef(null);


  return (
   <>
    <div className='w-full h-full flex flex-col pb-5 xl:bg-gray'>
      <div className='w-11/12 m-auto h-fit py-2'>
        <h1 className='uppercase font-bold'>Concern and Issue</h1>
      </div>
      <div className='md:w-11/12 h-full m-auto grid grid-cols-2 grid-flow-row rounded-lg bg-white'>
        <div className='col-span-2 xl:col-span-1 xl:row-span-1  p-5  '>
          <div className='w-full h-full grid grid-flow-row gap-5 '>
            {/*  */}
            <div className='row-span-1 grid grid-cols-2 items-center'>
              <div className='col-span-1 h-full flex items-center gap-5'>
                <figure className='w-full h-full min-h-20 min-w-20 max-w-20 max-h-20 rounded-full shadow-md overflow-hidden'>
                  <img src={pfp} className='w-full h-full bg-white' alt="" />
                </figure>
                <div className='w-full'>
                  <p className='text-sm xl:text-xl font-semibold'>Joselle E. Callora</p>
                  <p  className='text-xs'><span>UNIT - </span>001</p>
                </div>
              </div>
              <div className='col-span-1 xl:w-full text-sm xl:text-base flex justify-end'>
                <p className=''>January 03, 2024</p>
              </div>
            </div>
            {/*  */}
            <div className='row-auto flex flex-col gap-5'>
              <p className='font-bold h-fit'>SINK LEAKING - Maintenance Report</p>
              <div className='h-full text-sm '>
                <p className='text-ellipsis xl:max-w-auto max-h-[125px] xl:text-wrap overflow-hidden'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, et modi aliquid velit, eligendi expedita, illo consequuntur amet provident fugit aspernatur autem rerum. Cupiditate ea corrupti sit culpa quia voluptatibus doloribus minima ipsam nobis necessitatibus nesciunt dicta aperiam dolorem quaerat, rem similique, recusandae est velit? Obcaecati aut eligendi blanditiis quam?
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, et modi aliquid velit, eligendi expedita, illo consequuntur amet provident fugit aspernatur autem rerum. Cupiditate ea corrupti sit culpa quia voluptatibus doloribus minima ipsam nobis necessitatibus nesciunt dicta aperiam dolorem quaerat, rem similique, recusandae est velit? Obcaecati aut eligendi blanditiis quam?
                </p>
              </div>
            </div>
            {/*  */}
            <div className='row-span-4 w-full h-full bg-white rounded-xl shadow-md overflow-hidden'>
              <div className='relative w-full h-full min-h-60'>
                <figure className='w-full h-full'>
                  <img src={sample} className="w-full h-full" alt="" />
                </figure>
                <div className='absolute top-0 left-5 w-fit h-full flex items-center'>
                  <button className='w-full h-full max-w-10 max-h-14 rounded-md hover:bg-gray/40'>
                    <img src={angle} className="w-full h-full" alt="" />
                  </button>
                </div>
                <div className='absolute top-0 w-fit h-full right-5 flex items-center rotate-180'>
                  <button className='w-full h-full max-w-10  max-h-14 rounded-md hover:bg-gray/40'>
                    <img src={angle} className="w-full h-full" alt="" />
                  </button>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
        <div className='col-span-2 xl:col-span-1 xl:row-span-1 p-5'>
          <div className='w-full h-full flex flex-col'>
            <div className="w-full xl:w-11/12 h-full m-auto flex flex-col rounded-xl border-2 border-primary overflow-hidden">
              <div className='h-full max-h-20 flex items-center justify-center py-5 bg-primary rounded-t-md'>
               <div className='flex items-center  gap-2 '>
                <figure className='w-full h-full max-w-7'>
                  <img src={comments} alt="" />
                </figure>
                <p className='font-light tracking-wider text-white'>Comments</p>
               </div>
              </div>
              <div className='w-full h-full '>
                <div className="w-full h-auto max-h-[600px] px-5 hover:overflow-y-scroll overflow-hidden">
                  
                  <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                    <figure className='w-12 h-12 max-w-12  max-h-12  rounded-full'>
                      <img src={pfp}  className="w-full h-full" alt="" />
                    </figure>
                    <div className='w-11/12 text-xs md:text-base rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                    </div>
                  </div>
                  
                  <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                    <figure className='w-12 h-12 max-w-12  max-h-12  rounded-full'>
                      <img src={pfp}  className="w-full h-full" alt="" />
                    </figure>
                    <div className='w-11/12 text-xs md:text-base rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                    </div>
                  </div>

                  <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                    <figure className='w-12 h-12 max-w-12  max-h-12  rounded-full'>
                      <img src={pfp}  className="w-full h-full" alt="" />
                    </figure>
                    <div className='w-11/12 text-xs md:text-base rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                    </div>
                  </div>

                  <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                    <figure className='w-12 h-12 max-w-12  max-h-12  rounded-full'>
                      <img src={pfp}  className="w-full h-full" alt="" />
                    </figure>
                    <div className='w-11/12 text-xs md:text-base rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                    </div>
                  </div>

                  <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                    <figure className='w-12 h-12 max-w-12  max-h-12  rounded-full'>
                      <img src={pfp}  className="w-full h-full" alt="" />
                    </figure>
                    <div className='w-11/12 text-xs md:text-base rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className='w-full h-full flex items-center max-h-32 bg-primary'>
                <div className='w-11/12 m-auto h-4/5'>
                  <form className='h-full w-full flex items-center gap-2 overflow-hidden'>
                    <textarea name="" id="" placeholder="Send Message" className='w-full h-full  rounded-md outline-none border-2 border-gray p-5'></textarea>
                    <div className='w-full max-w-fit flex items-center'>
                      <button className='w-full h-full p-3 flex items-center justify-center  rounded-full hover:bg-white/10'>
                        <figure className='w-full h-full max-w-10 max-h-10 flex justify-center items-center'>
                          <img src={send} className='w-full h-full' alt="" />
                        </figure>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default ViewConcern