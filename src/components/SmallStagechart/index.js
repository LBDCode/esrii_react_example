import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ReferenceArea
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
          <ReferenceArea y1={0} y2={2} alwaysShow fill="#28a745" strokeOpacity={0.3} />
          <ReferenceArea y1={2} y2={2.4} alwaysShow fill="#ffc107" strokeOpacity={0.3} />
          <ReferenceArea y1={2.4} y2={3} alwaysShow fill="#ff9007" strokeOpacity={0.3} />
          <ReferenceArea y1={3} y2={3.4} alwaysShow fill="#dc3545" strokeOpacity={0.3} />
          <ReferenceArea y1={3.4} y2={4} alwaysShow fill="#7626bf" strokeOpacity={0.3} />

     </AreaChart>
    );
  }
}
