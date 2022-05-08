import React from 'react';

import Options from './Options';
import Month from './Month';

/*
Return calendar HTML
    Options:
        (!!! not used) type: 'month' | 'year' Calendar type
        monthNames: {Array<string>} list of month names
        weekDaysNames: {Array<string>} list of week days names start from sunday
        weekendDays: {Array<string>} weekend days
        firstWeekday: name of frist week day

    Return function f(year, month)
*/

/*
layout is two dimentional array 7 column 6 row
[
    row: [ val, val, val, ...]
    ...
]
*/

/* Options example:

{
    !!! not used type: 'month',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekDaysNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    firstWeekday: 'Sun',
    weekendDays: ['Sun'],
}

*/

export default function MonthCalendar({year, month, options}) {
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
    options.visibleWeekDays.map((el) => (<TdWrapperSimple>{el}</TdWrapperSimple>))
  }</tr>);

  const monthProps = new Month(year, month, options.visibleWeekDays, options);
  const { caption } = monthProps;
  const layout = monthProps.getLayout();

  return (
    <table>
      <caption>{caption}</caption>
      <thead><DayOfWeekHtml /></thead>
      <tbody>{
        layout.map((row) => (
          <tr>{
            row.map((content, index) => <TdWrapperWithWeekend index={index} >{content}</TdWrapperWithWeekend>)
          }</tr>
        ))
      }</tbody>
    </table>
  );
}
