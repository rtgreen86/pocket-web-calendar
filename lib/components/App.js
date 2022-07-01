import React from 'react';
import { MonthCalendar, YearCalendar } from '.';
export default function App() {
  const marks = {
    "1986-01-03": 'green',
    "1986-02-14": 'blue'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(YearCalendar, {
    year: 1986,
    firstDayOfWeek: 1,
    marks: marks
  }), /*#__PURE__*/React.createElement(MonthCalendar, {
    year: 1986,
    month: 1,
    firstDayOfWeek: 1,
    marks: marks
  }));
}