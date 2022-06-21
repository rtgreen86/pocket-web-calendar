export default class Formatter {
  static fixed(format, value) {
    return format.substring(value.toString().length).concat(value.toString());
  }

  static isoDate(date) {
    return [
      Formatter.fixed('0000', date.getFullYear()),
      Formatter.fixed('00', date.getMonth() + 1),
      Formatter.fixed('00', date.getDate())
    ].join('-');
  }
}
