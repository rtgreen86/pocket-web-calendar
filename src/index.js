import '../assets/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

// const year = document.createElement('DIV');
// year.classList.add('container', 'calendar');
// document.body.appendChild(year);
// const myCalendar2 = new Calendar(year, { });
// myCalendar2.year = 1986;
// myCalendar2.show();

const container = document.getElementById('app-container');
const root = ReactDOM.createRoot(container);
root.render(<App />);
