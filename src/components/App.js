import React from 'react';
import { MonthCalendar, YearCalendar } from '.';

export default function App() {
  const marks = {
    "1986-01-03": 'green',
    "1986-02-14": 'blue'
  };

  const handleClick = (date) => {
    console.log(`Clicked: ${date}`);
  }

  return (<>
    <YearCalendar year={1986} firstDayOfWeek={1} marks={marks} onClick={handleClick} />
    <MonthCalendar year={1986} month={1} firstDayOfWeek={1} marks={marks} onClick={handleClick} />
  </>);
}
