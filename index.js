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

function calendar(options) {

  // Options and defaults

  if (options == null) {
      options = {}
  }

  const   type            =   options.type === 'month' ? options.type : 'year',


          monthNames      =   [...new Set(options.monthNames ||
                              ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                               'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'])],

          weekDaysNames   =   [...new Set(options.weekDaysNames ||
                              ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'])],

          weekendDays     =   [...new Set(options.weekendDays ||
                              ['Сб', 'Вс'])],

          firstWeekday    =   options.firstWeekday || 'Пн';


  class Month {
    constructor(year, month) {
        this.setYear(year);
        this.setMonth(month);
        this.caption = this.getMonthCaption();
        this.daysCount = this.getDaysCount();
        this.beginningEmptyCells = this.getBeginningEmptyCells();
        this.endEmptyCells = this.getEndEmptyCells(this.daysCount, this.beginningEmptyCells);
    }

    setYear(year) {
        if (typeof year === 'number' && !isNaN(year) && year >= 0) {
            this.year = year;
        } else {
            this.year = new Date().getFullYear();
        }
    }

    setMonth(month) {
        if (typeof month === 'string') {
            month = monthNames.indexOf(month);
        }
        if (typeof month === 'number') {
            month = Math.trunc(month);
        }
        if (typeof month !== 'number' || isNaN(month) || month < 0 || month >= 12) {
            month = new Date().getMonth();
        }
        this.month = month;
    }

    getMonthCaption() {
        return monthNames[this.month]
    }

    getDaysCount() {
        const date = new Date();
        date.setDate(1);
        date.setYear(this.year);
        date.setMonth(this.month + 1);
        date.setDate(0);
        return date.getDate();
    }

    getBeginningEmptyCells() {
        const firstDayOfWeek = this.getFirstDayOfWeek();
        const beginningEmptyCells = visibleWeekDays.indexOf(firstDayOfWeek);
        if (beginningEmptyCells === -1) {
            beginningEmptyCells = 0;
        }
        return beginningEmptyCells;
    }

    getEndEmptyCells(daysCount, beginningEmptyCells) {
        const totalCells = visibleWeekDays.length * 6;
        return totalCells - daysCount - beginningEmptyCells;
    }

    getFirstDayOfWeek() {
        const date = new Date();
        date.setDate(1);
        date.setYear(this.year);
        date.setMonth(this.month);
        return weekDaysNames[date.getDay()];
    }
  }

  function * sequence(from, to) {
      for (let i = from; i <= to; i++) yield i;
  }

  // Common functions

  const compose = (...fns) => (x) => fns.reduce((x, f) => f(x), x);
  const map = (x, fn) => x.map(fn);
  const join = (x) => x.join('');

  // Month Gird

  const emptyValues = (count) => new Array(count).fill('&nbsp');

  const days = (count) => [...sequence(1, count)];
  // Ore use recursive function
  // const days = (count) => (+count || 0) ? [...days(count-1), count] : [];

  const months = () => [...sequence(0, 11)];

  const firstWeekdayIndex =
        weekDaysNames.indexOf(firstWeekday) > -1 ? weekDaysNames.indexOf(firstWeekday) : 0;

  const visibleWeekDays = [
      ...weekDaysNames.slice(firstWeekdayIndex),
      ...weekDaysNames.slice(0, firstWeekdayIndex)];

  /*

  layout is two dimentional array 7 column 6 row
  [
      row: [ val, val, val, ...]
      ...
  ]

  */

  function layoutBuilder(layout, value) {
      if (!Array.isArray(layout)) {
          layout = layoutBuilder([], layout);
      }
      layout =
          (!layout.length || layout[layout.length - 1].length === 7) ?
          [...layout, []] :
          [...layout];
      layout[layout.length - 1] = [...layout[layout.length - 1], value];
      return layout;
  }

  const dayWrapper = (content) => `<td>${content}</td>`;

  const weekendWrapper = (content) => `<td class="weekend">${content}</td>`;

  const tdWrapper = (weekendDays) => (day, index) => {
      return weekendDays
          .map((day) => visibleWeekDays.indexOf(day))
          .includes(index) ? weekendWrapper(day) : dayWrapper(day);
  };

  const trWrapper = (content) => `<tr>${content}</tr>`;

  const tdWrapperSimple = tdWrapper([]);

  const tdWrapperWithWeekend = tdWrapper(weekendDays);

  const dayOfWeekHtml = trWrapper(visibleWeekDays.map(tdWrapperSimple).join(''));

  function monthCalendar(year, month) {
      const monthProps = new Month(year, month);
      const {caption} = monthProps;
      const gridHtml = compose(
          ({beginningEmptyCells, daysCount, endEmptyCells}) => [
              ...emptyValues(beginningEmptyCells),
              ...days(daysCount),
              ...emptyValues(endEmptyCells)
          ],
          (x) => x.reduce(layoutBuilder),
          (x) => x.map((row) => row.map(tdWrapperWithWeekend).join('')),
          (x) => x.map(trWrapper),
          (x) => x.join('')
      )(monthProps);

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
