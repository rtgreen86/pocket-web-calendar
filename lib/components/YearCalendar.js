import './styles.css';
import React from 'react';
import MonthGrid from './MonthGrid';
import { YearCalendarPropTypes } from './PropTypes';
export default function YearCalendar({
  year,
  firstDayOfWeek,
  weekendDays,
  marks
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "container calendar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "caption"
  }, year), /*#__PURE__*/React.createElement("div", {
    className: "year"
  }, Array.from({
    length: 12
  }, (el, idx) => idx).map(month => /*#__PURE__*/React.createElement("div", {
    key: month,
    className: "month"
  }, /*#__PURE__*/React.createElement(MonthGrid, {
    year: year,
    month: month,
    firstDayOfWeek: firstDayOfWeek,
    weekendDays: weekendDays,
    marks: marks
  })))));
}
YearCalendar.propTypes = YearCalendarPropTypes;
YearCalendar.defaultProps = {
  year: undefined,
  firstDayOfWeek: undefined,
  weekendDays: undefined
};