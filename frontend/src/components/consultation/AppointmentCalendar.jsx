import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useGetAllAppointmentsQuery } from "../features/appointmentApi";

const AppointmentCalendar = ({ onDateSelect, selectedDate }) => {
  const { data: appointments } = useGetAllAppointmentsQuery();
  console.log(appointments);

  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    let days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelected =
        selectedDate &&
        new Date(selectedDate).toDateString() === currentDay.toDateString();
      const isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;

      const handleClick = () => {
        if (!isWeekend) {
          const nextDay = new Date(currentDay);
          nextDay.setDate(nextDay.getDate() + 1); // Adds one day
          const formattedDate = nextDay.toISOString().split("T")[0];
          onDateSelect?.(formattedDate);
        }
      };

      days.push(
        <button
          key={`day-${day}`}
          onClick={handleClick}
          disabled={isWeekend}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-sm flex items-center justify-center transition-all
            ${
              isSelected
                ? "bg-[#009688] text-white shadow-md"
                : isWeekend
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-white text-gray-700"
            }
            hover:scale-105 focus:outline-none focus:ring-0`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="max-w-sm sm:max-w-md mx-auto shadow-sm rounded-lg p-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-gray-500 hover:text-black transition"
        >
          <FiChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-700">
          {month} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-500 hover:text-black transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">{renderCalendar()}</div>

      <div className="mt-6 text-xs flex justify-start text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-gray-300 rounded-full inline-block"></span>
          Day Off (Sat & Sun)
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
