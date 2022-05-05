
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

function calendar(options) {
  options = new Options(options);
  const type = options.type;
  const weekendDays = options.weekendDays;

  // Common functions
  const compose = (...fns) => (x) => fns.reduce((x, f) => f(x), x);
  const map = (x, fn) => x.map(fn);
  const join = (x) => x.join('');
  const months = () => [...sequence(0, 11)];

  const dayWrapper = (content) => `<td>${content}</td>`;

  const weekendWrapper = (content) => `<td class="weekend">${content}</td>`;

  const tdWrapper = (weekendDays) => (day, index) => {
    return weekendDays
      .map((day) => options.visibleWeekDays.indexOf(day))
      .includes(index) ? weekendWrapper(day) : dayWrapper(day);
  };

  const trWrapper = (content) => `<tr>${content}</tr>`;

  const tdWrapperSimple = tdWrapper([]);

  const tdWrapperWithWeekend = tdWrapper(weekendDays);

  const dayOfWeekHtml = trWrapper(options.visibleWeekDays.map(tdWrapperSimple).join(''));

  function monthCalendar(year, month) {
    const monthProps = new Month(year, month, options.visibleWeekDays, options);
    const { caption } = monthProps;
    const gridHtml = compose(
      (x) => x.map((row) => row.map(tdWrapperWithWeekend).join('')),
      (x) => x.map(trWrapper),
      (x) => x.join('')
    )(monthProps.getLayout());

    return (
      `<table>
              <caption>${caption}</caption>
              <thead>${dayOfWeekHtml}</thead>
              <tbody>${gridHtml}</tbody>
          </table>`);
  }

  // Year grid

  function yearCalendar(year) {
    return join(map(map(months(), (month) => monthCalendar(year, month)), (month) => `<div class="month">${month}</div>`));
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
    this.element.innerHTML = curriedCalendar(this.year, this.month);
  }
}
