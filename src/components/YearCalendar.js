import React from 'react';
import PropTypes from 'prop-types';
import MonthGrid from './MonthGrid';

export default function YearCalendar({year, firstDayOfWeek, weekendDays, marks, ...props}) {
  return (<div className="container calendar">
    <div className="caption">{year}</div>
    <div className="year">{
    Array.from({length: 12}, (el, idx) => idx).map((month) => (
      <div key={month} className="month">
        <MonthGrid year={year} month={month} firstDayOfWeek={firstDayOfWeek} weekendDays={weekendDays} marks={marks} {...props}/>
      </div>
    ))
  }</div></div>);
}

YearCalendar.propTypes = {
  year: PropTypes.number,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  weekendDays: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6])),
  marks: PropTypes.objectOf(PropTypes.string)
};

YearCalendar.defaultProps = {
  year: undefined,
  firstDayOfWeek: undefined,
  weekendDays: undefined,
};
