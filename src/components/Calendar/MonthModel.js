import { getDaysOfWeekCaptions, getMonthesCaptions } from './captions';

export default class MonthModel {
  constructor({
    locale,
    firstDayOfWeek = 0,
    year = 1981,
    month = 8,
    weekendDays = [],
  }) {
    this.year = year;
    this.month = month;
    this.firstDayOfWeek = firstDayOfWeek;
    this.weekendDays = weekendDays;
    this.daysOfWeekCaptions = getDaysOfWeekCaptions(locale);
    this.monthCaptions = getMonthesCaptions(locale);
  }

  set year(value) {
    if (typeof value === 'number' && !isNaN(value) && value >= 0) {
      this._year = value;
    } else {
      this._year = new Date().getFullYear();
    }
  }

  get year() {
    return this._year;
  }

  set month(value) {
    if (typeof value === 'string') {
      value = this.monthCaptions.indexOf(value);
    }
    if (typeof value === 'number') {
      value = Math.trunc(value);
    }
    if (typeof value !== 'number' || isNaN(value) || value < 0 || value >= 12) {
      value = new Date().getMonth();
    }
    this._month = value;
  }

  get month() {
    return this._month;
  }

  getMonthCaption() {
    return this.monthCaptions[this.month];
  }

  getDaysOfWeekCaptions() {
    return [...daysOfWeekSeqence(this.firstDayOfWeek, 7)]
      .map((value) => this.daysOfWeekCaptions[value]);
  }

  getDaysGrid() {
    const days = [...daysOfWeekSeqence(this.firstDayOfWeek, 7)];
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
        grid[i][j].isWeekend = this.weekendDays.includes(days[j]);
        if (cellNo + this.firstDayOfWeek >= firstDayOfMonth && date <= lastDate) {
          grid[i][j].caption = date;
          date++;
        }
        grid[i][j].cellNo = cellNo;
        cellNo++;
      }
    }
    return grid;
  }
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
