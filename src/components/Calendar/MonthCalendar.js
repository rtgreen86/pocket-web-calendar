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

// Components

const DayWrapper = ({children}) => <td>{children}</td>;

const WeekendWrapper = ({children}) => <td className="weekend">{children}</td>;

const TrWrapper = ({children}) => <tr>{children}</tr>;

function calendar(options) {
  options = new Options(options);
  const weekendDays = options.weekendDays;

  const tdWrapper = (weekendDays) => ({children, index}) => {
    return weekendDays
      .map((day) => options.visibleWeekDays.indexOf(day))
      .includes(index) ? (
        <WeekendWrapper>{children}</WeekendWrapper>
      ) : (
        <DayWrapper>{children}</DayWrapper>
      );
  };

  const TdWrapperSimple = tdWrapper([]);

  const TdWrapperWithWeekend = tdWrapper(weekendDays);

  const DayOfWeekHtml = () => (<TrWrapper>{
    options.visibleWeekDays.map((el) => (<TdWrapperSimple>{el}</TdWrapperSimple>))
  }</TrWrapper>);

  function monthCalendar(year, month) {
    const monthProps = new Month(year, month, options.visibleWeekDays, options);
    const { caption } = monthProps;
    const layout = monthProps.getLayout();
    const gridElement = layout.map((row) => (
      <TrWrapper>{
        row.map((content, index) => <TdWrapperWithWeekend index={index} >{content}</TdWrapperWithWeekend>)
      }</TrWrapper>
    ));

    return (
      <table>
        <caption>{caption}</caption>
        <thead><DayOfWeekHtml /></thead>
        <tbody>{gridElement}</tbody>
      </table>
    );
  }

  return monthCalendar;
}

/* Options example:

{
    !!! not used type: 'month',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekDaysNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    firstWeekday: 'Sun',
    weekendDays: ['Sun'],
}

*/

export default function MonthCalendar({year, month}) {
  const curriedCalendar = calendar();
  return curriedCalendar(year, month);
}
