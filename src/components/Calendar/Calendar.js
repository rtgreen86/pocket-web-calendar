import React from 'react';


import Options from './Options';
import Month from './Month';

/*
Return calendar HTML
    Options:
        type: 'month' | 'year' Calendar type
        monthNames: {Array<string>} list of month names
        weekDaysNames: {Array<string>} list of week days names start from sunday
        weekendDays: {Array<string>} weekend days
        firstWeekday: name of frist week day

    Return function f(year, month)
*/

function* sequence(from, to) {
  for (let i = from; i <= to; i++) yield i;
}

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
  const type = options.type;
  const weekendDays = options.weekendDays;

  // Common functions
  const months = () => [...sequence(0, 11)];


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

  // Year grid

  function yearCalendar(year) {
    const _monthes = months();
    const monthCalendarElements = _monthes.map((month) => monthCalendar(year, month));
    const wrapped = monthCalendarElements.map((m) => (<div className="month">{m}</div>))
    return wrapped;
  }

  return type === 'month' ? monthCalendar : yearCalendar;
}

export default class Calendar {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.year = null;
    this.month = null;
  }

  show() {
    /* Options example:

    {
        type: 'month',
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekDaysNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        firstWeekday: 'Sun',
        weekendDays: ['Sun'],
    }

    */

    const curriedCalendar = calendar(this.options);
    return curriedCalendar(this.year, this.month);
  }
}
