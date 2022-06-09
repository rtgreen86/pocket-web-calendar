import React from 'react';
import { MonthCalendar, YearCalendar } from './Calendar';

export default function App() {
  return (<>
    <YearCalendar year={1986} firstDayOfWeek={1} />
    <MonthCalendar year={1986} month={1} firstDayOfWeek={1} />
  </>);
}
