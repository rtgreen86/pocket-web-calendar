import React from 'react';

import Options from './Options';
import Month from './Month';

/*
layout is two dimentional array 7 column 6 row
[
    row: [ val, val, val, ...]
    ...
]
*/

export default function MonthCalendar2({year, month, options}) {
  options = options || {};
  options.firstWeekday = 'Вс';
  options = new Options(options);
  const weekendDays = options.weekendDays;

  const tdWrapper = (weekendDays) => ({children, index}) => {
    return weekendDays
      .map((day) => options.visibleWeekDays.indexOf(day))
      .includes(index) ? (
        <td className="weekend">{children}</td>
      ) : (
        <td>{children}</td>
      );
  };

  const TdWrapperSimple = tdWrapper([]);

  const TdWrapperWithWeekend = tdWrapper(weekendDays);

  const DayOfWeekHtml = () => (<tr>{
    options.visibleWeekDays.map((el) => (<TdWrapperSimple key={el}>{el}</TdWrapperSimple>))
  }</tr>);


  const monthProps = new Month(year, month, options.visibleWeekDays, options);
  const { caption } = monthProps;

  const grid = monthProps.getDays2();

  return (
    <table>
      <caption>{caption}</caption>
      <thead><DayOfWeekHtml /></thead>
      <tbody>{
        grid.map((row, index) => (
          <tr key={index}>{
            row.map(({cellNo, caption}) => <TdWrapperWithWeekend key={cellNo} >{caption}</TdWrapperWithWeekend>)
          }</tr>
        ))
      }</tbody>
    </table>
  );
}
