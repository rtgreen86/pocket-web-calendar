import React from 'react';

import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';

export default function Calendar({type, year, month}) {
  if (type !== 'month') {
    return (<div className="container calendar"><div className="year">
      <YearCalendar year={year} />
    </div></div>);
  }
  return (<div className="container calendar">
    <MonthCalendar year={year} month={month} />
  </div>);
}
