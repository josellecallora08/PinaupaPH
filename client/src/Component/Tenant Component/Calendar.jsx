import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'; // Import the default calendar styles
import money from '/money.svg';

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
      return 'border-2 bg-red rounded-md shadow-lg'; // Apply styles for the due date
    }

    if (date.getDate() === invoiceDatePaid.getDate() && date.getMonth() === invoiceDatePaid.getMonth()) {
      return `border-2 rounded-md ${invoiceDatePaid > invoiceDueDate ? 'bg-lime/50' : ''} shadow-lg`; // Apply styles for the paid date
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
        <span className="" role="img" aria-label="money bag">
        💵
        </span>
      ); // Show money bag icon on the paid date
    }

    if (date.getDate() === userMonthlyDue.getDate() && date.getMonth() === userMonthlyDue.getMonth()) {
      return (
        <span className="" role="img" aria-label="money with wings">
          ❗
        </span>
      ); // Show emoji on the monthly due date
    }

    if (date.getDate() === invoiceDueDate.getDate() && date.getMonth() === invoiceDueDate.getMonth()) {
      return (
        <span className="" role="img" aria-label="money with wings">
          ❗
        </span>
      ); // Show emoji on the invoice due date
    }

    return null; // No content for other dates
  };

  return (
    <div className="w-11/12 m-auto">
      <Calendar
        className="w-full h-full"
        tileClassName={tileClassName} // Pass the tileClassName function to the Calendar component
        tileContent={tileContent} // Pass the tileContent function to the Calendar component
      />
    </div>
  );
};

export default Calendars;
