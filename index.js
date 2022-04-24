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

const defaultOptions = {
    type: 'year',
    monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDaysNames: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekendDays: ['Сб', 'Вс'],
    firstWeekday: 'Пн'
};

class Options {
    constructor(options) {
        options = options || {};
        this.type = options.type === 'month' ? options.type : defaultOptions.type;
        this.monthNames = options.monthNames || defaultOptions.monthNames;
        this.weekDaysNames = options.weekDaysNames || defaultOptions.weekDaysNames;
        this.weekendDays = options.weekendDays || defaultOptions.weekendDays;
        this.firstWeekday = options.firstWeekday || defaultOptions.firstWeekday;
        this.firstWeekdayIndex = this.getFirstWeekdayIndex();
        this.visibleWeekDays = this.getVisibleWeekDays();
    }

    getFirstWeekdayIndex() {
        return this.weekDaysNames.indexOf(this.firstWeekday) > -1 ? this.weekDaysNames.indexOf(this.firstWeekday) : 0;
    }

    getVisibleWeekDays() {
        return [
            ...this.weekDaysNames.slice(this.firstWeekdayIndex),
            ...this.weekDaysNames.slice(0, this.firstWeekdayIndex)
        ];
    }
}

class Month {
    constructor(year, month, visibleWeekDays, options) {
        this.visibleWeekDays = visibleWeekDays;
        this.options = new Options(options);
        this.setYear(year);
        this.setMonth(month);
        this.caption = this.getMonthCaption();
        this.daysCount = this.getDaysCount();
        this.beginningEmptyCells = this.getBeginningEmptyCells();
        this.endEmptyCells = this.getEndEmptyCells(this.daysCount, this.beginningEmptyCells);
        this.days = this.getDays();
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
            month = this.options.monthNames.indexOf(month);
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
        return this.options.monthNames[this.month]
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
        const beginningEmptyCells = this.options.visibleWeekDays.indexOf(firstDayOfWeek);
        if (beginningEmptyCells === -1) {
            beginningEmptyCells = 0;
        }
        return beginningEmptyCells;
    }

    getEndEmptyCells(daysCount, beginningEmptyCells) {
        const totalCells = this.options.visibleWeekDays.length * 6;
        return totalCells - daysCount - beginningEmptyCells;
    }

    getFirstDayOfWeek() {
        const date = new Date();
        date.setDate(1);
        date.setYear(this.year);
        date.setMonth(this.month);
        return this.options.weekDaysNames[date.getDay()];
    }

    getDays() {
        return [
            ...emptyValues(this.beginningEmptyCells),
            ...days(this.daysCount),
            ...emptyValues(this.endEmptyCells)
        ];
    }
}

const emptyValues = (count) => new Array(count).fill('&nbsp');

const days = (count) => [...sequence(1, count)];

function * sequence(from, to) {
    for (let i = from; i <= to; i++) yield i;
}

function calendar(options) {
    options = new Options(options);
    const type = options.type;
    const weekendDays = options.weekendDays;

  // Common functions
  const compose = (...fns) => (x) => fns.reduce((x, f) => f(x), x);
  const map = (x, fn) => x.map(fn);
  const join = (x) => x.join('');
  const months = () => [...sequence(0, 11)];

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
          .map((day) => options.visibleWeekDays.indexOf(day))
          .includes(index) ? weekendWrapper(day) : dayWrapper(day);
  };

  const trWrapper = (content) => `<tr>${content}</tr>`;

  const tdWrapperSimple = tdWrapper([]);

  const tdWrapperWithWeekend = tdWrapper(weekendDays);

  const dayOfWeekHtml = trWrapper(options.visibleWeekDays.map(tdWrapperSimple).join(''));

  function monthCalendar(year, month) {
      const monthProps = new Month(year, month, options.visibleWeekDays, options);
      const {caption} = monthProps;
      const gridHtml = compose(
          (x) => x.reduce(layoutBuilder),
          (x) => x.map((row) => row.map(tdWrapperWithWeekend).join('')),
          (x) => x.map(trWrapper),
          (x) => x.join('')
      )(monthProps.days);

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
