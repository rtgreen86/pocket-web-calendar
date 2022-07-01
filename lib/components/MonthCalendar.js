import React from 'react';
import MonthGrid from './MonthGrid';
export default function MonthCalendar(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "container calendar"
  }, /*#__PURE__*/React.createElement(MonthGrid, props));
}