import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'; // Import the default calendar styles

const Calendars = ({ user, invoice }) => {
  // Define a function to determine the class name for each date tile
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return ''; // Apply styles only on month view

    const invoiceDueDate = new Date(invoice?.due);
    const invoiceDatePaid = new Date(invoice?.datePaid);

    // Check if the date is a Sunday
    if (date.getDay() === 0) {
      return 'weekend'; // Apply the 'weekend' class name for Sundays
    }

    if (date.getDate() === invoiceDueDate.getDate() && date.getMonth() === invoiceDueDate.getMonth()) {
      return 'border-2 border-red bg-red/55 rounded-md shadow-lg'; // Apply styles for the due date
    }

    if (date.getDate() === invoiceDatePaid.getDate() && date.getMonth() === invoiceDatePaid.getMonth()) {
      return `border-2 rounded-md ${invoiceDatePaid > invoiceDueDate ? 'bg-red/20' : 'bg-lime/50'} shadow-lg`; // Apply styles for the paid date
    }

    return ''; // Return an empty string for other dates
  };

  // Define a function to render content for each tile
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null; // Render content only on month view

    const invoiceDueDate = new Date(invoice?.due);
    const invoiceDatePaid = new Date(invoice?.datePaid);
    const userMonthlyDue = new Date(user?.monthly_due);

    if (date.getDate() === invoiceDatePaid.getDate() && date.getMonth() === invoiceDatePaid.getMonth()) {
      return (
        <div className="">
          <span className="" role="img" aria-label="money bag">
            {invoiceDatePaid > invoiceDueDate ? '❗' : '💵'}
          </span>
          <div className="paid-tooltip">
            Payment Paid
          </div>
        </div>
      ); // Show money bag icon on the paid date
    }

    if (date.getDate() === userMonthlyDue.getDate()) {
      return (
        <div>
          <span className="" role="img" aria-label="bell">
            🔔
          </span>
          <div className="duedate-tooltip">
      
            Due Date
            
          </div>
        </div>
      ); // Show emoji on the monthly due date with hover effect
    }

    return null; // No content for other dates
  };

  return (
    <div className="w-11/12 m-auto ">
      <Calendar
        className="w-full h-full tile"
        tileClassName={tileClassName} // Pass the tileClassName function to the Calendar component
        tileContent={tileContent}
         // Pass the tileContent function to the Calendar component
      />
    </div>
  );
};

export default Calendars;
