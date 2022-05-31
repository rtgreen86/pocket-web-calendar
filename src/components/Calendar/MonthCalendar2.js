import React from 'react';
import PropTypes from 'prop-types';

import Options from './Options';
import Month from './Month';

/*
layout is two dimentional array 7 column 6 row
[
    row: [ val, val, val, ...]
    ...
]
*/

export default function MonthCalendar2({year, month, firstDayOfWeek, options}) {
  options = options || {};

  // deprecated
  // used for days of week captions
  // TODO: create new function to generate proper days of week captions
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  options.firstWeekday = daysOfWeek[firstDayOfWeek];

  options.firstDayOfWeek = firstDayOfWeek;
  options = new Options(options);
  const weekendDays = options.weekendDays;

  const tdWrapper = (weekendDays) => ({children, isWeekend}) => {
    return isWeekend ? (
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
            row.map(({cellNo, caption, isWeekend}) => <TdWrapperWithWeekend isWeekend={isWeekend} key={cellNo} >{caption}</TdWrapperWithWeekend>)
          }</tr>
        ))
      }</tbody>
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
  options: PropTypes.any,
};

MonthCalendar2.defaultProps = {
  year: null,
  month: null,
  firstDayOfWeek: 0,
  options: {},
};
