import React from 'react';
import Calendar from './Calendar';
import Month from './Calendar/Month';

export default function App() {
  return (<>
    <Calendar year={1986} firstDayOfWeek={1}></Calendar>
    <Calendar type="month" year={1986} month={1} firstDayOfWeek={1}></Calendar>
  </>);
}
