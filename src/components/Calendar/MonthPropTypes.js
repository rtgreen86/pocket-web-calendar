import PropTypes from 'prop-types';

import YearPropTypes from './YearPropTypes';

export default {
  ...YearPropTypes,
  month: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
