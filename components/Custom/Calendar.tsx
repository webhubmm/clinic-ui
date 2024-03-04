import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { HolidayManagementDataType } from "@/types/holidayManagementType";
import { formatDateYYMMDD } from "@/utils/changes";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

interface CustomCalendarProps {
  formData: HolidayManagementDataType;
  setFormData: (value: any) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  formData,
  setFormData,
}: CustomCalendarProps) => {
  const dispatch = useAppDispatch();
  const closedDates = useAppSelector((state) => state.calendarSlice.date);

  useEffect(() => {
    // Any additional logic you want to perform when closedDates changes
  }, [closedDates]);

  const disablePreviousDates = (date: any) => {
    const currentDate = new Date();
    return date <= currentDate;
  };

  const handleDateChange = (value: any) => {
    const test = formatDateYYMMDD(value);
    setFormData({ ...formData, date: test });
  };

  const tileClassName = ({ date }: { date: Date }) => {
    // Check if the date is in the closedDates array
    if (
      Array.isArray(closedDates) &&
      closedDates.includes(formatDateYYMMDD(date))
    ) {
      return "closed-date"; // Apply custom class for disabled dates
    }
    return ""; // Return empty string for other dates
  };

  const isDateDisabled = (date: Date) => {
    // Check if the date is in the closedDates array
    return (
      Array.isArray(closedDates) && closedDates.includes(formatDateYYMMDD(date))
    );
  };

  return (
    <Box width={"100%"}>
      <Calendar
        onChange={(value: any) => handleDateChange(value)}
        className="calendar-container"
        tileDisabled={({ date }) =>
          disablePreviousDates(date) || isDateDisabled(date)
        }
        tileClassName={tileClassName}
      />
    </Box>
  );
};

export default CustomCalendar;
