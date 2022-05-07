import React from 'react';

import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';

export default function Calendar({type, year, month}) {
  if (type !== 'month') {
    return (<div className="container calendar">
      <YearCalendar year={year} />
    </div>);
  }
  return (<div className="container calendar">
    <MonthCalendar year={year} month={month} />
  </div>);
}
