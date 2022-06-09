import './styles.css';

import React from 'react';

import { MonthCalendarPropTypes } from './PropTypes';
import MonthModel from './MonthModel';

export default function MonthGrid({
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

MonthGrid.propTypes = MonthCalendarPropTypes;

MonthGrid.defaultProps = {
  year: undefined,
  month: undefined,
  firstDayOfWeek: 0,
  weekendDays: [0, 6],
};
