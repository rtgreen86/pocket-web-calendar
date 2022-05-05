import Options from './Options';

export default class Month {
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

  getLayout() {
    return this.days.reduce(layoutBuilder, []);
  }
}

const emptyValues = (count) => new Array(count).fill(null);

const days = (count) => [...sequence(1, count)];

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

function* sequence(from, to) {
  for (let i = from; i <= to; i++) yield i;
}
