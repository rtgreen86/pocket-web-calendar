import React from 'react';
import PropTypes from 'prop-types';

import Month from './Month2';

export default function MonthCalendar2({
  year,
  month,
  firstDayOfWeek,
  weekendDays,
}) {
  const model = new Month({ year, month, firstDayOfWeek, weekendDays });
  const monthCaption = model.getMonthCaption();
  const daysOfWeekCaptions = model.getDaysOfWeekCaptions();
  const daysGrid = model.getDaysGrid();

  return (
    <table>
      <caption>{monthCaption}</caption>
      <thead><tr>{daysOfWeekCaptions.map((value) => <td key={value}>{value}</td>)}</tr></thead>
      <tbody>{daysGrid.map((row, index) => (
        <tr key={index}>{row.map(({cellNo, caption, isWeekend}) => (
          <td key={cellNo} className={isWeekend ? 'weekend' : ''}>{caption}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  );
}

MonthCalendar2.propTypes = {
  year: PropTypes.number,
  month: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  weekendDays: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]))
};

MonthCalendar2.defaultProps = {
  year: null,
  month: null,
  firstDayOfWeek: 0,
  weekendDays: [0, 6],
};
