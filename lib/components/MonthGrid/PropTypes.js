import PropTypes from 'prop-types';
import { YearCalendarPropTypes } from '../PropTypes';
export default { ...YearCalendarPropTypes,
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};