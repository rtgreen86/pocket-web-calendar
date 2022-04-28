import React from 'react';
import Calendar from './components/Calendar';

export default function App() {
  return (<>
    <Calendar type="month" year={1986} month="Февраль"></Calendar>
    <Calendar year={1986}></Calendar>
  </>);
}
