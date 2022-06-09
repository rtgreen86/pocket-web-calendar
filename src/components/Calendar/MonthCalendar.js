import React from 'react';

import MonthGrid from './MonthGrid';

export default function MonthCalendar(props) {
  return <div className="container calendar"><MonthGrid {...props} /></div>;
}
