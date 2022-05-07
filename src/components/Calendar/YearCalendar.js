import React from 'react';

import MonthCalendar from './MonthCalendar';

export default function YearCalendar({year}) {
  return Array.from({length: 12}, (el, idx) => idx).map((month) => (
    <div key={month} className="month">
      <MonthCalendar year={year} month={month} />
    </div>)
  )
}
