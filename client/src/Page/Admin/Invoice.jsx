import React, { useEffect, useState } from 'react';
import InvoiceFormat from '../../Component/InvoiceFormat';
import plus from '/plus.svg'
import search from '/search.svg'
import { useDispatch } from 'react-redux';
import action from '/action.svg'
import eye from '/eye.svg'
import ManualInovoice from '../../Component/ManualInovoice';
const Invoice = () => {
  const [filter, setFilter] = useState('')
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const handleFilter = () => {

    }

    document.addEventListener('keydown', handleFilter)

    return (
      document.removeEventListener('keydown', handleFilter)
    )
  }, [])


  return (
    <>
    <div className=' w-full h-full bg-gray'>
        <div className='w-11/12 m-auto h-full flex flex-col'>
          <h1 className='font-bold py-5 tracking-wider'>DOCUMENTS / INVOICE</h1>
          <div className='w-full h-full flex items-center justify-between max-h-24 '>
              <div className='relative w-full h-full max-w-60 md:max-w-96 max-h-10 rounded-full overflow-hidden border-2 border-[#9e9e9e] flex items-center group'>
                <input type="search" id='search' onChange={filter} placeholder='Search' className='w-full h-full [&:not(:placeholder-shown)]:border-primary pl-10 p-5 rounded-full outline-none' />
                <label htmlFor="search" className='absolute left-0 w-full h-full max-w-10'>
                  <img src={search} alt="" />
                </label>
              </div>
              <div>
                <button onClick={() => setModal(prevState => !prevState)} className='flex items-center gap-2 bg-primary p-2 rounded-md'>
                  <figure className='w-full h-full max-w-5 max-h-5'>
                    <img src={plus} alt="" />
                  </figure>
                  <span className='text-xs text-white uppercase font-semibold tracking-wider'> Prepare Invoice</span>
                </button>
              </div>
          </div>
          <div className='w-full h-full py-5'>
            <div className='relative w-full h-full max-h-[660px] bg-white overflow-y-scroll border-primary border-l-4 border-b-4'>
              <table className='w-full h-auto max-h-full '>
                <thead className='sticky top-0 bg-primary z-10'>
                  <tr className='text-center text-xs md:text-base'>
                    <th className='text-white p-3 w-1/5'>Reference Number</th>
                    <th className='text-white p-3 w-1/5'>Tenant</th>
                    <th className='text-white p-3 w-1/5'>Balance</th>
                    <th className='text-white p-3 w-1/5'>Status</th>
                    <th className='text-white p-3 w-1/5'>Action</th>
                  </tr>
                </thead>
                <tbody className='w-full h-auto bg-white'>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  <tr className='text-center text-xs md:text-base'>
                    <td className='text-primary p-3'>INV-1892381923-12309812</td>
                    <td className='text-sm md:text-base text-primary p-3'>Joselle E. Callora</td>
                    <td className='p-3'>Php 6,000</td>
                    <td className='p-3 text-primary font-semibold'>Unpaid</td>
                    <td className=' text-primary p-3 flex justify-center'>
                      <div className='relative'>
                      <button className='w-full h-full flex items-center gap-3 border-2 px-3 rounded-sm group hover:bg-primary/20'>
                        <figure className='w-full h-full flex items-center max-w-5'>
                          <img src={eye}  alt="" />
                        </figure>
                        <span className=''>View</span>
                      </button>
                       {/* <ul className='absolute right-10 top-0 list-none'>
                        <li>
                          <span>View</span>
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>   */}
                      </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>  
    {modal ?
    <ManualInovoice
    setModal={setModal}
    />
    : ''}

</>
);
};

export default Invoice;
