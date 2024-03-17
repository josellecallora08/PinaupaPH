import React, { useEffect, useRef } from 'react'
import angle from '/angle.svg'
import comments from '/comments.svg'
const Concern = () => {

  
const messageContainerRef = useRef(null);

useEffect(() => {
  const container = messageContainerRef.current;
    container.scrollTop = container.scrollHeight;
}, []);

  return (
    <div className='h-full w-11/12 m-auto flex flex-col py-5'>
      <h1 className='h-full max-h-20 uppercase font-bold md:py-5 tracking-wider'>Concern and Issues</h1>
      <div className='w-full h-full md:flex md:shadow-md rounded-md md:overflow-hidden'>
          <div className='w-full h-auto md:h-full md:p-5 flex flex-col gap-5'>
              <div className='h-auto max-h-auto flex flex-col gap-2'>
                <div className='relative h-full w-full flex items-center justify-between gap-5 '>
                  <div className='flex items-center gap-5 w-full h-full'>
                    <figure className='w-full h-full max-w-16 max-h-16'>
                      <img src="" className='w-full h-full p-5 rounded-full bg-white' alt="" />
                    </figure>
                    <div className='w-full'>
                      <p className='font-bold'>Roland Q. Angeles</p>
                      <p className='text-sm'>Unit 001</p>
                    </div>
                  </div>
                  <div className='absolute right-0 text-xs md:text-base'>
                    January 20, 2024
                  </div>
                </div>
                <div className='font-bold'>SINK LEAKING - Maintenance Report</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui fugiat voluptatibus quo laudantium, delectus aperiam aut necessitatibus iusto enim beatae, velit nihil suscipit ad rerum nulla officia excepturi ipsa dolorum quam non omnis? Distinctio voluptatum at soluta nesciunt tenetur earum odio est. Quisquam accusantium, eius est totam possimus quo vel dignissimos impedit!</div>
              </div>
              <div className='relative w-full h-full max-h-60 md:max-h-none'>
                <figure className='h-full w-full md:bg-white shadow-sm rounded-md'>
                  <img src="" className='w-full h-full' alt="" />
                </figure>
                <button className='absolute top-1/2 left-5 w-full h-full max-w-14 max-h-14 p-2 rounded-full'>
                  <img src={angle} alt="" />
                </button>
                <button className='absolute top-1/2 right-5 w-full h-full max-w-14 max-h-14 p-2 rounded-full'>
                  <img src={angle} className="rotate-180" alt="" />
                </button>
              </div>
          </div>
          <div className='w-full h-full flex flex-col p-5 '>
                <div className='w-11/12 h-full max-h-20 m-auto flex gap-3 items-center justify-center text-center py-3 border-b-2 bg-primary rounded-t-md border-primary'>
                  <figure className='w-full h-full flex items-center max-w-5 max-h-5'>
                    <img src={comments} alt="" className='w-full h-full' />
                  </figure>
                  <span className='text-white'>Comments</span> 
                </div>
                <div className='w-11/12 h-full max-h-[550px] m-auto bg-no-repeat overflow-auto flex  items-end md:overflow-y-scroll scroll-smooth'>
                  <div ref={messageContainerRef} className='flex flex-col gap-5 h-auto max-h-full  w-full text-sm md:text-base'>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex flex-row-reverse gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>
                    <div className='min-h-20 w-full flex gap-2 items-center overflow-hidden'>
                      <figure className='w-12 h-12 max-w-12  max-h-12 border rounded-full'>
                        <img src=""  className="w-full h-full" alt="" />
                      </figure>
                      <div className='w-4/5 rounded-md bg-gray/50 p-3'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ratione adipisci autem qui vitae optio veniam odit, accusamus dolore aperiam?
                      </div>
                    </div>


                  </div>
                </div>
                <div className=' w-11/12 h-auto m-auto min-h-20 max-h-32'>
                  <form className='h-full w-full rounded-md overflow-hidden'>
                      <textarea name="" id="" placeholder="Send Message" className='w-full h-full outline-none border-2 border-gray p-5'></textarea>
                  </form>
                </div>
          </div>
      </div>
    </div>
  )
}

export default Concern