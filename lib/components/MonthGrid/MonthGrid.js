import React from 'react';
import MonthCalendarPropTypes from './PropTypes';
import MonthFactory from './MonthFactory';
export default function MonthGrid({
  year,
  month,
  firstDayOfWeek,
  weekendDays,
  marks
}) {
  const factory = new MonthFactory({
    firstDayOfWeek,
    weekendDays,
    marks
  });
  const {
    caption,
    daysWeek,
    grid
  } = factory.buildMonth(year, month);
  return /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("caption", null, caption), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, daysWeek.map(value => /*#__PURE__*/React.createElement("td", {
    key: value
  }, value)))), /*#__PURE__*/React.createElement("tbody", null, grid.map((row, index) => /*#__PURE__*/React.createElement("tr", {
    key: index
  }, row.map(({
    cellNo,
    caption,
    isWeekend,
    marks,
    date
  }) => /*#__PURE__*/React.createElement("td", {
    key: cellNo,
    className: (isWeekend ? 'weekend' : '') + marks,
    "data-date": date
  }, caption))))));
}
MonthGrid.propTypes = MonthCalendarPropTypes;
MonthGrid.defaultProps = {
  year: 1981,
  month: 8,
  firstDayOfWeek: 0,
  weekendDays: [0, 6],
  marks: {}
};