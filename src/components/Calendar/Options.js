export const defaultOptions = {
  type: 'year',
  monthNames: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  weekDaysNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  weekendDays: [0, 6],
  firstWeekday: 'Пн'
};

/**
 * Calendar options
 *
 * @property {Array<string>} monthNames list of month names
 * @property {Array<string>} weekDaysNames list of week days names start from sunday
 * @property {Array<string>} weekendDays weekend days
 * @property {number} firstWeekday first week day
 */
export class Options {
  /**
   * Create an Options
   * @param {Object} options values for options
   *
   * @example
   *
   * {
   *    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   *    weekDaysNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
   *    firstWeekday: 0,
   *    weekendDays: ['Sun'],
   * }
   *
   */
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

export default Options;
