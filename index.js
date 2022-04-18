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


  // Algorithms

  function monthConfigBuilder(year, month) {
      var date = new Date();
      date.setDate(1);
      year = +year;
      if (typeof year === 'number' && !isNaN(year) && year >= 0) {
          date.setYear(year);
      }
      if (typeof month === 'string') {
          month = monthNames.indexOf(month);
      }
      if (typeof month === 'number') {
          month = Math.trunc(month);
      }
      if (typeof month === 'number' && !isNaN(month) && month > -1 && month < 12) {
          date.setMonth(month);
      } else {
          month = date.getMonth();
      }
      var firstDayOfWeek = weekDaysNames[date.getDay()];
      var totalCells = visibleWeekDays.length * 6;
      var beginningEmptyCells = visibleWeekDays.indexOf(firstDayOfWeek);
      if (beginningEmptyCells === -1) {
          beginningEmptyCells = 0;
      }
      date.setMonth(month + 1);
      date.setDate(0);
      var daysCount = date.getDate();
      return {
          caption: monthNames[month],
          beginningEmptyCells: beginningEmptyCells,
          endEmptyCells: totalCells - daysCount - beginningEmptyCells,
          daysCount: daysCount
      };
  }

  function * sequence(from, to) {
      for (let i = from; i <= to; i++) yield i;
  }

  // Common functions

  const compose = (...fns) => (x) => fns.reduce((x, f) => f(x), x);
  const map = (x, fn) => x.map(fn);
  const reduce = (x, fn, val) => typeof val === 'undefined' ? x.reduce(fn) : x.reduce(fn, val);
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
      const monthProps = monthConfigBuilder(year, month);
      const {caption} = monthProps;

      // Way 1

      // const gridHtml = compose(
      //     ({beginningEmptyCells, daysCount, endEmptyCells}) => [
      //         ...emptyValues(beginningEmptyCells),
      //         ...days(daysCount),
      //         ...emptyValues(endEmptyCells)
      //     ],
      //     (x) => x.reduce(layoutBuilder),
      //     (x) => x.map((row) => row.map(tdWrapperWithWeekend).join('')),
      //     (x) => x.map(trWrapper),
      //     (x) => x.join('')
      // )(monthProps);

      // Way 2

      const monthCells = ({beginningEmptyCells, daysCount, endEmptyCells}) => [
          ...emptyValues(beginningEmptyCells),
          ...days(daysCount),
          ...emptyValues(endEmptyCells)
      ];

      const wrappedRow = (row) => join(map(row, tdWrapperWithWeekend));

      const gridHtml = join(map(map(reduce(monthCells(monthProps), layoutBuilder), wrappedRow), trWrapper));

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

// Usage

const curriedCalendar = calendar({
  // type: 'month',
  // monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  // weekDaysNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  // firstWeekday: 'Sun',
  // weekendDays: ['Sun'],
});

document.getElementById('content').innerHTML = curriedCalendar(/*2000, 'Февраль'*/);

