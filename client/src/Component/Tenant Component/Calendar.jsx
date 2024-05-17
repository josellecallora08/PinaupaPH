import React, { useState } from 'react'
import Calendar from 'react-calendar'
import './Calendar.css' // Import the default calendar styles
import money from '/money.svg'
const Calendars = ({ user, invoice }) => {
  // Define a function to determine the class name for each date tile
  const tileClassName = ({ date, view }) => {
    // Check if the date is a Sunday
    if (date.getDay() === 0) {
      return 'weekend' // Apply the 'sunday' class name for Sundays
    }

    if (date.getDate() === new Date(invoice?.due).getDate()) {
      return 'border-2 rounded-md bg-primary-color/50 shadow-lg' // Apply the 'highlighted-day' class name for the specified days
    }

    if (
      date.getDate() === new Date(invoice?.datePaid).getDate() &&
      date.getMonth() === new Date(invoice?.datePaid).getMonth()
    ) {
      return `border-2 rounded-md ${new Date(invoice?.datePaid) > new Date(invoice?.due) && 'bg-red/20'} shadow-lg` // Apply the 'highlighted-day' class name for the specified days
    }
    // Return an empty string for other dates
    return ''
  }

  // Function to check if a given date is the last day of the month
  const isLastDayOfMonth = (date) => {
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + 1)
    return nextDay.getDate() === 1
  }

  // Function to check if a given date is today
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Define a function to render content for each tile (emoji for highlighted days)
  const tileContent = ({ date }) => {
    // Check if the date is the 15th day of the month or the last day of the month
    if (
      date.getDate() === new Date(invoice?.datePaid).getDate() &&
      date.getMonth() === new Date(invoice?.datePaid).getMonth()
    ) {
      return (
        <span className="xl:absolute" role="img" aria-label="emoji">
          <img src={money} className="w-5" alt="" />
        </span>
      ) // Emoji for highlighted days
    }
    if (date.getDate() === new Date(user?.monthly_due).getDate()) {
      return (
        <span className="" role="img" aria-label="emoji">
          💸
        </span>
      ) // Em
    }
    if (date.getDate() === new Date(invoice?.due).getDate()) {
      return (
        <span className="" role="img" aria-label="emoji">
          💸
        </span>
      ) // Em // Apply the 'highlighted-day' class name for the specified days
    }
    return null
  }

  return (
    <div className="w-11/12 m-auto">
      <Calendar
        className={`w-full h-full`}
        tileClassName={tileClassName} // Pass the tileClassName function to the Calendar component
        tileContent={tileContent} // Pass the tileContent function to the Calendar component
      />
    </div>
  )
}

export default Calendars
