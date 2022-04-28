import './index.css';

import Calendar from './Calendar';

const month = document.createElement('DIV');
month.classList.add('container', 'calendar');
document.body.appendChild(month);
const myCalendar1 = new Calendar(month, { type: 'month' });
myCalendar1.year = 1986;
myCalendar1.month = 'Февраль';
myCalendar1.show();

const year = document.createElement('DIV');
year.classList.add('container', 'calendar');
document.body.appendChild(year);
const myCalendar2 = new Calendar(year, { });
myCalendar2.year = 1986;
myCalendar2.show();
