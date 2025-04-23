import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AppointmentCalendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    let days = [];
    let day = 1;

    // Empty slots before 1st
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
    }

    // Day buttons
    for (day; day <= totalDays; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      const status = isWeekend
        ? 'day-off'
        : Math.random() > 0.7
        ? 'booked'
        : 'available';

      const handleClick = () => {
        console.log(`Clicked on: ${currentDay.toDateString()}`);
        if (onDateSelect) {
          onDateSelect(currentDay.toISOString().split('T')[0]);
        }
      };

      days.push(
        <button
          key={`day-${day}`}
          onClick={handleClick}
          className={`w-10 h-10 sm:w-10 sm:h-10 flex cursor-pointer text-center items-center justify-center rounded-full text-sm transition duration-200
            ${isToday ? 'border-2 border-white' : 'border border-transparent'}
            ${status === 'booked'
              ? 'bg-blue-500 text-white'
              : status === 'day-off'
              ? 'bg-gray-500 text-white'
              : 'bg-green-200 text-gray-800'}
            hover:scale-105 hover:border-black`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full shadow rounded p-4 sm:p-6 space-y-4">
      <div className="bg-gray-800 p-3 sm:p-5 rounded">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm sm:text-lg font-semibold text-white">
            Appointment Calendar
          </h2>
          <div className="flex items-center space-x-2">
            <button onClick={prevMonth} className="text-white hover:text-gray-300 cursor-pointer">
              <FiChevronLeft size={18} />
            </button>
            <button onClick={nextMonth} className="text-white hover:text-gray-300 cursor-pointer">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Month/Year */}
        <div className="text-xs sm:text-base text-white/80 mb-2">
          {month} {year}
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-[1px] sm:text-sm text-white/60 text-center mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-between items-center gap-2 mt-4 text-[10px] sm:text-xs text-white/70">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-green-200 rounded-full mr-1"></span>
            Available
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
            Booked
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-1"></span>
            Day Off
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
