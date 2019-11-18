import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import moment from 'moment';



export default class Example extends PureComponent {

  render() {
    return (

       <AreaChart
       width={230}
       height={100}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dateTime" 
            tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')}
            allowDuplicatedCategory={false}

          />
          <YAxis dataKey="value"/>
          {/* <Tooltip /> */}
          <Area type="monotone" data={this.props.data} dataKey="value" dot={false} stroke="#444" fill="#014d6d" />
          <Area type="monotone" data={this.props.forecastData} dataKey="value" dot={false} stroke="#444" fill="#82ca9d" />

     </AreaChart>
    );
  }
}
