import PropTypes from 'prop-types';

import MonthPropTypes from './MonthPropTypes'

export default {
  ...MonthPropTypes,
  type: PropTypes.oneOf(['month', 'year']),
};
