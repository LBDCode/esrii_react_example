import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import moment from 'moment';



export default class Example extends PureComponent {

  render() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={this.props.data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="dateTime" 
          tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')}
        />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}
