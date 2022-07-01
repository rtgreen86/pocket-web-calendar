import PropTypes from 'prop-types';
export const YearCalendarPropTypes = {
  year: PropTypes.number,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  weekendDays: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6])),
  marks: PropTypes.objectOf(PropTypes.string)
};
export const MonthCalendarPropTypes = { ...YearCalendarPropTypes,
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};