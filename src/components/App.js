import React from 'react';
import Calendar from './Calendar';
import MonthCalendar2 from './Calendar/MonthCalendar2';

export default function App() {
  return (<>
    <Calendar year={1986}></Calendar>
    <Calendar type="month" year={1986} month="Февраль"></Calendar>
    <div className="container calendar">
      <MonthCalendar2 year={1986} month="Февраль" />
    </div>
  </>);
}
