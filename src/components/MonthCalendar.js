import React from 'react';
import PropTypes from 'prop-types';
import MonthGrid from './MonthGrid';

export default function MonthCalendar(props) {
  return <div className="container calendar"><MonthGrid {...props} /></div>;
}

MonthCalendar.propTypes = {
  year: PropTypes.number,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  weekendDays: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6])),
  marks: PropTypes.objectOf(PropTypes.string),
  month: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
