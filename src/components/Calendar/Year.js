import React from 'react';

import Month from './Month';
import YearPropTypes from './YearPropTypes';

export default function Year({year, firstDayOfWeek, weekendDays}) {
  return Array.from({length: 12}, (el, idx) => idx).map((month) => (
    <div key={month} className="month">
      <Month year={year} month={month} firstDayOfWeek={firstDayOfWeek} weekendDays={weekendDays}/>
    </div>)
  )
}

Year.propTypes = YearPropTypes;

Year.defaultProps = {
  year: undefined,
  firstDayOfWeek: undefined,
  weekendDays: undefined,
};
