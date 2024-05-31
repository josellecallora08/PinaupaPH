import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import {
  fetchDelinquencyReport,
  fetchGoodpayerReport,
  fetchRevenueReport,
  generateDelinquencyReport,
  generateGoodpayerReport,
  generateRevenueReport,
} from '../../features/report';

const PayerReport = () => {
  const report = useSelector((state) => state.report.data);
  const currentYear = new Date().getFullYear();

  const [selectedReport, setSelectedReport] = useState('Revenue Report');
  const [dateRange, setDateRange] = useState({
    from: `${currentYear}-01-01`,
    to: `${currentYear}-12-31`,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedReport === 'Revenue Report') dispatch(fetchRevenueReport(dateRange));
    else if (selectedReport === 'Good Payers') dispatch(fetchGoodpayerReport(dateRange));
    else if (selectedReport === 'Delinquency Payers') dispatch(fetchDelinquencyReport(dateRange));
  }, [selectedReport, dateRange, dispatch]);

  useEffect(() => {
    console.log('Report data:', report);
  }, [report]);

  const generateReport = () => {
    const actionMap = {
      'Revenue Report': generateRevenueReport,
      'Good Payers': generateGoodpayerReport,
      'Delinquency Payers': generateDelinquencyReport,
    };
    const action = actionMap[selectedReport];
    if (action) {
      console.log('Generating report:', selectedReport, dateRange);
      dispatch(action(dateRange));
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('reportTable');
    const generationDate = new Date().toLocaleDateString(); // Get current date

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth() * 0.8;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const marginLeft = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;

      // Add generation date
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${generationDate}`, marginLeft, 30);

      // Add title
      pdf.setFontSize(18);
      pdf.text(selectedReport, pdf.internal.pageSize.getWidth() / 2, 20, { align: 'left' });



      // Add table image
      pdf.addImage(imgData, 'PNG', marginLeft, 40, pdfWidth, pdfHeight);

      // Add signature area
      const finalY = pdf.previousAutoTable ? pdf.previousAutoTable.finalY + 10 : pdfHeight + 50;
      pdf.setFontSize(12);
      pdf.text("Owner's Signature:", marginLeft, finalY + 20);
      pdf.line(marginLeft + 50, finalY + 20, pdf.internal.pageSize.getWidth() - marginLeft, finalY + 20); // Extend signature line

      pdf.save('report.pdf');
    });
  };

  return (
    <div className="w-11/12 mx-auto px-4 sm:px-6">
      <div className="my-5 font-bold cursor-default uppercase">Reports</div>
      <div className="lg:text-base text-xs">
        <div className="mb-4 flex justify-end items-center">
          <label htmlFor="reportType" className="mr-2 font-semibold">Select Report:</label>
          <select
            id="reportType"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="Revenue Report">Revenue Report</option>
            <option value="Good Payers">Good Payers</option>
            <option value="Delinquency Payers">Delinquency Payers</option>
          </select>
        </div>
        <div className="mb-8 cursor-default">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-2">
            <h2 className="lg:text-lg lg:w-auto lg:mr-0 text-xs font-semibold w-full mr-1">
              {selectedReport}
            </h2>
            <div className='flex flex-col md:flex-row gap-5 items-center'>
              <div className="flex lg:w-auto w-full items-center gap-2">
                <div className='flex items-center gap-5'>
                  <label>From:</label>
                  <DatePicker
                    selected={new Date(dateRange?.from)}
                    onChange={(date) =>
                      setDateRange((prev) => ({
                        ...prev,
                        from: date?.toISOString()?.split('T')[0] || new Date().toISOString()?.split('T')[0],
                      }))
                    }
                    dateFormat="MM/dd/yyyy"
                    showFourColumnMonthYearPicker
                    className="border px-2 py-1 rounded"
                  />
                </div>
                <div className='flex items-center gap-5'>
                  <label>To:</label>
                  <DatePicker
                    selected={new Date(dateRange.to)}
                    onChange={(date) =>
                      setDateRange((prev) => ({
                        ...prev,
                        to: date?.toISOString()?.split('T')[0] || new Date().toISOString()?.split('T')[0],
                      }))
                    }
                    dateFormat="MM/dd/yyyy"
                    showFourColumnMonthYearPicker
                    className="border px-2 py-1 rounded"
                  />
                </div>
              </div>
              {/* <button
                onClick={generateReport}
                className="lg:block w-full md:w-fit bg-primary-color hover:bg-primary-color/50 duration-200 text-white px-3 py-2 rounded-md"
              >
                Generate Report
              </button> */}
              <button
                onClick={downloadPDF}
                className="lg:block w-full md:w-fit bg-primary-color hover:bg-primary-color/50 duration-200 text-white px-3 py-2 rounded-md"
              >
                Download PDF
              </button>
            </div>
          </div>
          <div id="reportTable" className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-primary-color text-white">
                <tr>
                  <th className="border px-4 py-2">Tenant</th>
                  <th className="border px-4 py-2">Unit No.</th>
                  <th className="border px-4 py-2">Apartment Name</th>
                  <th className="border px-4 py-2">Due Date</th>
                  <th className="border px-4 py-2">Date Paid</th>
                  <th className="border px-4 py-2">Amount To Be Paid</th>
                  <th className="border px-4 py-2">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {report?.filter(item => item.isPaid && item.datePaid).map((val, index) => (
                  <tr key={index} className="text-center">
                    <td className="border px-4 py-2">
                      {val.tenant_id.user_id.name}
                    </td>
                    <td className="border px-4 py-2">
                      {val.tenant_id.unit_id.unit_no}
                    </td>
                    <td className="border px-4 py-2">
                      {val.tenant_id.apartment_id.name}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(val.due).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {val.datePaid && new Date(val.datePaid).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {val.amount.toLocaleString('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      })}
                    </td>
                    <td className="border px-4 py-2">
                      {val.payment.amountPaid.toLocaleString('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-left">
                    <strong>Total</strong>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <strong>
                      {report?.filter(item => item?.isPaid && item?.datePaid)
                        ?.reduce(
                          (acc, curr) => (acc = acc + curr?.payment?.amountPaid),
                          0,
                        )
                        ?.toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP',
                        })}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayerReport;
