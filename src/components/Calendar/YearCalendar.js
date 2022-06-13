import './styles.css';

import React from 'react';

import MonthGrid from './MonthGrid';
import { YearCalendarPropTypes } from './PropTypes';

export default function YearCalendar({year, firstDayOfWeek, weekendDays}) {
  return (<div className="container calendar">
    <div className="caption">{year}</div>
    <div className="year">{
    Array.from({length: 12}, (el, idx) => idx).map((month) => (
      <div key={month} className="month">
        <MonthGrid year={year} month={month} firstDayOfWeek={firstDayOfWeek} weekendDays={weekendDays}/>
      </div>
    ))
  }</div></div>);
}

YearCalendar.propTypes = YearCalendarPropTypes;

YearCalendar.defaultProps = {
  year: undefined,
  firstDayOfWeek: undefined,
  weekendDays: undefined,
};
