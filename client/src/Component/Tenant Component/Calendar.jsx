import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'; // Import the default calendar styles

const Calendars = () => {
  // Define a function to determine the class name for each date tile
  const tileClassName = ({ date, view }) => {
    // Check if the date is a Sunday
    if (date.getDay() === 0) {
      return 'sunday'; // Apply the 'sunday' class name for Sundays
    }
    // Check if the date is the 15th day of the month or the last day of the month
    if (date.getDate() === 15 || isLastDayOfMonth(date)) {
      return 'highlighted-day'; // Apply the 'highlighted-day' class name for the specified days
    }
    // Return an empty string for other dates
    return '';
  };

  // Function to check if a given date is the last day of the month
  const isLastDayOfMonth = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay.getDate() === 1;
  };

  // Function to check if a given date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  // Define a function to render content for each tile (emoji for highlighted days)
  const tileContent = ({ date }) => {
    // Check if the date is the 15th day of the month or the last day of the month
    if (date.getDate() === 15 || isLastDayOfMonth(date)) {
      return <span role="img" aria-label="emoji">💸</span>; // Emoji for highlighted days
    }
    return null;
  };

  return (
    <div style={{ width: '100%' }}>
      <Calendar
        tileClassName={tileClassName} // Pass the tileClassName function to the Calendar component
        tileContent={tileContent} // Pass the tileContent function to the Calendar component
      />
      <style>
        {`
          .react-calendar__tile {
            color: black; /* Set the color of all dates to black */
          }
          .sunday {
            color: red; /* Set the color of Sundays to red */
          }
          .highlighted-day {
           /* Highlighted day background color */
            color: black; /* Highlighted day text color */
             /* Optional: Round the corners of highlighted days */
          }
          
    
          .react-calendar__tile--now {
            color: white; /* Set text color of today's date to white */
          }
          .react-calendar__tile--active {
            background-color: #007bff; /* Set background color of active date */
            color: white; /* Set text color of active date to white */
          }
        `}
      </style>
    </div>
  );
};

export default Calendars;
