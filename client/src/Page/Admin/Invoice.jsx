import React, { useEffect, useState } from 'react'
import InvoiceFormat from '../../Component/InvoiceFormat'
import plus from '/plus.svg'
import search from '/search.svg'
import { useDispatch } from 'react-redux'
import action from '/action.svg'
import eye from '/eye.svg'
import ManualInovoice from '../../Component/ManualInovoice'
import SearchBar from '../../Component/SearchBar'
const Invoice = () => {
  const [filter, setFilter] = useState('')
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleFilter = () => {}

    document.addEventListener('keydown', handleFilter)

    return document.removeEventListener('keydown', handleFilter)
  }, [])

  return (
    <>
      <div className=" w-full h-full">
        <div className="w-11/12 m-auto h-full flex flex-col">
          <h1 className="font-bold py-5 tracking-wider">DOCUMENTS / INVOICE</h1>
          <div className="w-full h-full flex items-center justify-between max-h-24 ">
            <SearchBar />
            <div>
              <button
                onClick={() => setModal((prevState) => !prevState)}
                className="flex items-center gap-2 bg-primary p-2 rounded-md"
              >
                <figure className="w-full h-full max-w-5 max-h-5">
                  <img src={plus} alt="" />
                </figure>
                <span className="text-xs text-white uppercase font-semibold tracking-wider">
                  {' '}
                  Prepare Invoice
                </span>
              </button>
            </div>
          </div>
          <div className="w-full h-full py-5">
            <div className="overflow-x-auto">
              <table className="table border-2 overflow-auto max-h-[200px]">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>

                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal ? <ManualInovoice setModal={setModal} /> : ''}
    </>
  )
}

export default Invoice
