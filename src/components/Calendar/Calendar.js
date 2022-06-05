import React from 'react';

import CalendarPropTypes from './CalendarPropTypes';
import Month from './Month';
import Year from './Year';

export default function Calendar({
  type,
  year,
  month,
  firstDayOfWeek,
  weekendDays,
}) {
  if (type !== 'month') {
    return (<div className="container calendar"><div className="year">
      <Year year={year} firstDayOfWeek={firstDayOfWeek} weekendDays={weekendDays} />
    </div></div>);
  }
  return (<div className="container calendar">
    <Month year={year} month={month} firstDayOfWeek={firstDayOfWeek} weekendDays={weekendDays} />
  </div>);
}

Calendar.propTypes = CalendarPropTypes;

Calendar.defaultProps = {
  type: 'year',
  year: undefined,
  month: undefined,
  firstDayOfWeek: undefined,
  weekendDays: undefined,
};
