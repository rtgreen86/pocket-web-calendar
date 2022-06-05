import React from 'react';

import MonthPropTypes from './MonthPropTypes';
import MonthModel from './MonthModel';

export default function Month({
  year,
  month,
  firstDayOfWeek,
  weekendDays,
}) {
  const model = new MonthModel({ year, month, firstDayOfWeek, weekendDays });
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

Month.propTypes = MonthPropTypes;

Month.defaultProps = {
  year: undefined,
  month: undefined,
  firstDayOfWeek: 0,
  weekendDays: [0, 6],
};
