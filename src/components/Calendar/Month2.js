import Options from './Options';
import Weekdays from './Weekdays';

export default class Month {
  constructor(options) {
    const {
      locale,
      firstDayOfWeek,
    } = options;

    this.locale = options.locale || 'ru-RU';
    this.firstDayOfWeek = firstDayOfWeek || 0;


    this.visibleWeekDays = options.visibleWeekDays;
    this.options = new Options(options);
    this.setYear(options.year);
    this.setMonth(options.month);
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

  getWeekdays() {
    const captions = Weekdays.create(this.locale);
    return [...daysOfWeekSeqence(this.options.firstDayOfWeek, 7)]
      .map((value) => captions[value]);
  }

  getDays() {
    const days = [...daysOfWeekSeqence(this.options.firstDayOfWeek, 7)];
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
    const lastDate = new Date(this.year, this.month + 1, 0).getDate();
    const grid = [];

    let cellNo = 0;
    let date = 1;

    for (let i = 0; i < 6; i++) { // rows
      grid[i] = [];
      for (let j = 0; j < 7; j++) {
        grid[i][j] = {};
        grid[i][j].caption = '';
        grid[i][j].isWeekend = this.options.weekendDays.includes(days[j]);
        if (cellNo + this.options.firstDayOfWeek >= firstDayOfMonth && date <= lastDate) {
          grid[i][j].caption = date;
          date++;
        }
        grid[i][j].cellNo = cellNo;
        cellNo++;
      }
    }

    return grid;
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

function* daysOfWeekSeqence(startFrom, count) {
  let value = startFrom;
  while (value > 6) value -= 7;
  while (value < 0) value += 7;
  while(count !== 0) {
    count--;
    yield value++;
    if (value > 6) value -= 7;
  }
}
