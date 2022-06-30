import { getDaysOfWeekCaptions, getMonthesCaptions } from './Captions';
import Formatter from './Formatter';

export default class MonthFactory {
  constructor({
    locale,
    firstDayOfWeek = 0,
    weekendDays = [],
    marks = {}
  }) {
    this.firstDayOfWeek = firstDayOfWeek;
    this.weekendDays = weekendDays;
    this.daysOfWeekCaptions = getDaysOfWeekCaptions(locale);
    this.monthCaptions = getMonthesCaptions(locale);
    this.marks = marks;
  }

  static normalizeYear(value) {
    if (typeof value === 'number' && !isNaN(value) && value >= 0) {
      return value;
    }
    return new Date().getFullYear();
  }

  static normalizeMonth(value) {
    if (typeof value === 'number') {
      value = Math.trunc(value);
    }
    if (typeof value !== 'number' || isNaN(value) || value < 0 || value >= 12) {
      value = new Date().getMonth();
    }
    return value;
  }

  buildMonthCaption(month) {
    month = MonthFactory.normalizeMonth(month);
    return this.monthCaptions[month];
  }

  buildDaysWeek() {
    return [...daysSeqence(this.firstDayOfWeek, 7)]
  }

  buildDaysWeekCaptions() {
    const days = this.buildDaysWeek();
    return days.map((value) => this.daysOfWeekCaptions[value]);
  }

  buildDatesGrid(year, month) {
    year = MonthFactory.normalizeYear(year);
    month = MonthFactory.normalizeMonth(month);
    const days = this.buildDaysWeek();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const grid = [];
    let cellNo = 0;
    let date = 1;
    for (let i = 0; i < 6; i++) { // rows
      grid[i] = [];
      for (let j = 0; j < 7; j++) {
        grid[i][j] = {};
        grid[i][j].caption = '';
        grid[i][j].isWeekend = this.weekendDays.includes(days[j]);
        grid[i][j].marks = '';
        if (cellNo + this.firstDayOfWeek >= firstDayOfMonth && date <= lastDate) {
          const isoDate = Formatter.isoDate(new Date(year, month, date));
          grid[i][j].date = isoDate;
          if (this.marks[isoDate]) {
            grid[i][j].marks = this.marks[isoDate];
          }
          grid[i][j].caption = date;
          date++;
        }
        grid[i][j].cellNo = cellNo;
        cellNo++;
      }
    }
    return grid;
  }

  buildMonth(year, month) {
    year = MonthFactory.normalizeYear(year);
    month = MonthFactory.normalizeMonth(month);
    return {
      caption: this.buildMonthCaption(month),
      daysWeek: this.buildDaysWeekCaptions(),
      grid: this.buildDatesGrid(year, month)
    };
  }
}

function* daysSeqence(startFrom, count) {
  let value = startFrom;
  while (value > 6) value -= 7;
  while (value < 0) value += 7;
  while(count !== 0) {
    count--;
    yield value++;
    if (value > 6) value -= 7;
  }
}
