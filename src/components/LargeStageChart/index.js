import React, { PureComponent } from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,ReferenceArea
} from 'recharts';
import moment from 'moment';



export default class Example extends PureComponent {

  render() {
    return (
      <LineChart
        width={500}
        height={400}
        data={this.props.data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis 
          dataKey="dateTime" 
          tickFormatter={timeStr => moment(timeStr).format('D MMM HH:mm')}
        />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" dot={false} stroke="#ffffff" strokeOpacity={1}/>
        <ReferenceArea y1={0} y2={2} alwaysShow fill="#28a745" strokeOpacity={0.3} />
        <ReferenceArea y1={2} y2={2.4} alwaysShow fill="#ffc107" strokeOpacity={0.3} />
        <ReferenceArea y1={2.4} y2={3} alwaysShow fill="#ff9007" strokeOpacity={0.3} />
        <ReferenceArea y1={3} y2={3.4} alwaysShow fill="#dc3545" strokeOpacity={0.3} />
        <ReferenceArea y1={3.4} y2={4} alwaysShow fill="#7626bf" strokeOpacity={0.3} />
      </LineChart>
    );
  }
}
