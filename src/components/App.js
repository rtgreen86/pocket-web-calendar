import React from 'react';
import Calendar from './Calendar';

export default function App() {
  return (<>
    <Calendar year={1986}></Calendar>
    <Calendar type="month" year={1986} month="Февраль"></Calendar>
  </>);
}
