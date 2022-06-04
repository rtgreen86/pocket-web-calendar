export default class Weekdays {
  static create(locale) {
    const date = new Date();
    const intl = new Intl.DateTimeFormat(locale, {
      weekday: 'short'
    });
    const weekdays = [];
    for (let i = 1; i <= 7; i++) {
      date.setDate(i);
      const day = date.getDay();
      const value = intl.format(date);
      weekdays[day] = value;

    }
    return weekdays;
  }
}
