import React from 'react';

import './styles.css';

import CalendarClass from './Calendar';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const node = this.myRef.current;
    const myCalendar1 = new CalendarClass(node, { type: this.props.type });
    myCalendar1.year = this.props.year;
    myCalendar1.month = this.props.month;
    const el = myCalendar1.show();
    return (<div ref={this.myRef} className="container calendar">{el}</div>);
  }
}