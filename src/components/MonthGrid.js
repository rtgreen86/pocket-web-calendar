import './styles.css';

import React from 'react';

import { MonthCalendarPropTypes } from './PropTypes';
import MonthFactory from './MonthFactory';

export default function MonthGrid({
  year,
  month,
  firstDayOfWeek,
  weekendDays,
  marks
}) {
  const factory = new MonthFactory({ firstDayOfWeek, weekendDays, marks });
  const {caption, daysWeek, grid} = factory.buildMonth(year, month);

  return (
    <table>
      <caption>{caption}</caption>
      <thead><tr>{daysWeek.map((value) => <td key={value}>{value}</td>)}</tr></thead>
      <tbody>{grid.map((row, index) => (
        <tr key={index}>{row.map(({cellNo, caption, isWeekend, marks, date}) => (
          <td key={cellNo} className={(isWeekend ? 'weekend' : '') + marks} data-date={date}>{caption}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  );
}

MonthGrid.propTypes = MonthCalendarPropTypes;

MonthGrid.defaultProps = {
  year: 1981,
  month: 8,
  firstDayOfWeek: 0,
  weekendDays: [0, 6],
  marks: {},
};
