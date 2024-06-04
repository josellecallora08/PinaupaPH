import React, { useEffect, useState } from 'react'
import {
  MdOutlineModeEditOutline,
  MdOutlineClose,
  MdInfoOutline,
  MdFileDownload,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUnit, fetchUnit } from '../../features/unit'
import EditApartmentUnit from './EditApartmentUnit'
import { generatePreviousTenants } from '../../features/report'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro'

const ApartmentStatusCard = ({ apartmentId, val, update, setUpdate }) => {
  const [isEditApartmentUnit, setIsEditApartmentUnit] = useState(false)
  const [isTenantInfoOpen, setIsTenantInfoOpen] = useState(false)
  const dispatch = useDispatch()
  const previousTenants = useSelector((state) => state.unit.single)
  const loading = useSelector((state) => state.unit.loading)
  const current = new Date().toLocaleDateString()
  const [updateTenants, setUpdateTenants] = useState(false)

  useEffect(() => {
    if (updateTenants) {
      dispatch(fetchUnit(apartmentId, val._id))
      setUpdateTenants(false)
    }
  }, [dispatch, updateTenants, apartmentId, val._id, setUpdateTenants])

  const toggleIsEditApartmentUnit = () => {
    setIsEditApartmentUnit(!isEditApartmentUnit)
  }

  const handleDelete = (unitId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this apartment?',
    )
    if (isConfirmed) {
      dispatch(deleteUnit(apartmentId, unitId))
    }
  }

  const handleTenants = () => {
    setIsTenantInfoOpen(!isTenantInfoOpen)
    if (!isTenantInfoOpen) {
      setUpdateTenants((prevState) => !prevState)
    }
  }

  const generateReport = () => {
    dispatch(generatePreviousTenants(val._id))
  }

  const downloadPDF = () => {
    const input = document.getElementById('tenantsTable')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth() * 0.8
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      const marginLeft = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2

      const date = new Date().toLocaleDateString()

      // Set the date at the top
      pdf.setFontSize(12)
      pdf.text(`Date Generated: ${date}`, marginLeft, 20)

      // Set the title below the date
      pdf.setFontSize(18)
      pdf.text(`Previous Tenants of Unit ${val?.unit_no}`, marginLeft, 35)

      // Add table image
      pdf.addImage(imgData, 'PNG', marginLeft, 45, pdfWidth, pdfHeight)

      // Add signature area
      const finalY = pdfHeight + 55
      pdf.setFontSize(12)
      pdf.text("Owner's Signature:", marginLeft, finalY + 20)
      pdf.line(
        marginLeft + 40,
        finalY + 20,
        pdf.internal.pageSize.getWidth() - marginLeft,
        finalY + 20,
      )

      pdf.save(`previous_tenants_unit_${val?.unit_no}.pdf`)
    })
  }

  return (
    <>
      <div className="relative flex flex-row overflow-hidden shadow-md shadow-gray rounded-lg">
        <div
          onClick={handleTenants}
          className="relative text-white flex items-center justify-center w-1/4 md:w-32 px-5 bg-dark-blue hover:bg-primary-color/85 group cursor-pointer md:flex-shrink-0"
        >
          <h1 className="text-2xl font-black group-hover:hidden">
            {val?.unit_no}
          </h1>
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <MdInfoOutline size={50} />
          </div>
        </div>
        <div className="relative pt-8 flex-grow bg-white">
          <p>
            <span className="text-xl md:text-2xl font-black ml-5">
              {val?.rent?.toLocaleString('en-PH', {
                style: 'currency',
                currency: 'PHP',
              })}
            </span>{' '}
            / per month
          </p>
          <p className="text-xs ml-5 mt-2 mr-2">
            {/* Current Tenant:{' '}
            <span className='font-bold'>{val?.tenants.find((item) => item?.isCurrent)?.tenant_id?.user_id?.name}</span> */}
            
            {val?.tenants.find((item) => item.isCurrent) ? (
              <>
               
                Current Tenant:
                <span className="font-bold">
                 
                  {
                    val.tenants.find((item) => item.isCurrent)?.tenant_id?.user_id
                      .name
                  }
                </span>
              </>
            ) : (
              'Available Unit'
            )}
          </p>
          <div className="justify-end mr-5 flex gap-2 mt-4 md:mt-16 ml-5 md:ml-44 pb-2">
            <button
              className="p-2 hover:scale-105 hover:duration-300 hover:bg-blue/55 bg-blue rounded-md"
              onClick={toggleIsEditApartmentUnit}
            >
              <MdOutlineModeEditOutline size={15} color="white" />
            </button>
            <button
              onClick={() => handleDelete(val?._id)}
              className="p-2 hover:scale-105 hover:duration-300 hover:bg-red/55 bg-red rounded-md"
            >
              <MdOutlineClose size={15} color="white" />
            </button>
            {/* <button
              onClick={downloadPDF}
              className="bg-lime rounded hover:bg-lime/55 text-white px-4 py-2"
            >
              <img src={pdf} className="w-5 h-5" alt="" />
            </button> */}
          </div>
        </div>
        {val?.occupied ? (
          <div className="absolute top-3 -right-9 w-28 h-8 bg-dark-blue text-white p-2 rotate-45">
            <p className="text-xs text-center text-white font-bold uppercase">
              Rented
            </p>
          </div>
        ) : (
          ''
        )}
        {isEditApartmentUnit && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-lg mt-12 bg-white rounded-lg">
              <EditApartmentUnit
                apartmentId={apartmentId}
                val={val}
                setIsEditApartmentUnit={setIsEditApartmentUnit}
              />
            </div>
          </div>
        )}
        {isTenantInfoOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-3xl mx-5 mt-12 bg-white rounded-md pb-2">
              <div className="flex p-5 rounded-tl-md rounded-tr-md justify-between items-center bg-primary-color">
                <div className="p-2 font-bold text-lg text-white bg-primary-color rounded-tl-md rounded-tr-md">
                  Previous Tenant of {val?.unit_no}
                </div>
                <div
                  onClick={downloadPDF}
                  className="border-2 rounded-full p-1 cursor-pointer hover:scale-110 text-white"
                >
                  <MdFileDownload />
                </div>
              </div>
              <div>
                <div
                  className="overflow-auto m-2"
                  style={{ maxHeight: '300px' }}
                  id="tenantsTable"
                >
                  <table className="min-w-full  bg-white">
                    <thead className="bg-primary-color text-white border-b-2 border-white sticky top-0">
                      <tr>
                        <th className="py-2 px-4 border-white lg:text-base text-xs">
                          Name
                        </th>
                        <th className="py-2 px-4 border-white lg:text-base text-xs">
                          Move In Date
                        </th>
                        <th className="py-2 px-4 border-white lg:text-base text-xs">
                          Move Out Date
                        </th>
                        <th className="py-2 px-4 border-white lg:text-base text-xs">
                          Stay Duration (days)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousTenants?.tenants?.map((tenant, index) => (
                        <tr
                          key={tenant?.tenant_id?.user_id?._id || index}
                          className="text-center lg:text-base text-xs"
                        >
                          <td className="border px-4 py-2 lg:text-base text-xs">
                            {tenant?.tenant_id?.user_id?.name}
                          </td>
                          <td className="border px-4 py-2 lg:text-base text-xs">
                            {new Date(tenant?.moveIn).toDateString()}
                          </td>
                          <td className="border px-4 py-2 lg:text-base text-xs">
                            {tenant?.moveOut
                              ? new Date(tenant?.moveOut).toDateString()
                              : ` not moved out`}
                          </td>
                          <td className="border px-4 py-2  text-xs lg:text-base text-xs">
                            {Math.floor(
                              (tenant?.moveOut
                                ? new Date(tenant?.moveOut) -
                                  new Date(tenant?.moveIn)
                                : new Date() - new Date(tenant?.moveIn)) /
                                (1000 * 60 * 60 * 24),
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 mb-2 mx-4 flex justify-between items-center">
                <div className="text-lg">
                  Total tenants: {previousTenants?.tenants?.length}
                </div>
                <button
                  onClick={() => setIsTenantInfoOpen((prevState) => !prevState)}
                  className="bg-red rounded hover:bg-red/55 text-white px-4 py-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ApartmentStatusCard
