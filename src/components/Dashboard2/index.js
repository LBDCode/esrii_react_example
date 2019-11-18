import React, {useState, useCallback, useMemo, useEffect} from 'react';
import SmallFlowchart from '../SmallFlowchart';
import SmallStagechart from '../SmallStagechart';
import LargeFlowChart from '../LargeFlowChart';
import LargeStageChart from '../LargeStageChart';
import Modal from "../Modal";
import useToggle from '../UseModal';
import API from '../../utils/api';
import { useGlobal } from 'reactn';
import xmlTostring from 'react-xml-parser'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';



const Dashboard = (props) => {

  // hooks for global gage state and local flow data state
  const [ currentGageID, setGageID ] = useGlobal('currentGageID');
  const [ currentGageName, setGageName] = useGlobal('currentGageName');
  const [ currentGageDatum, setGageDatum] = useGlobal('currentGageDatum');


  // hooks for local flow and stage data for selected gage
  const [flowData, setFlowData] = useState(null);
  const [stageData, setStageData] = useState(null);

   // hooks for local forecasted flow and stage data for selected gage
   const [forecastflowData, setForecastFlowData] = useState(null);
   const [forecaststageData, setForecastStageData] = useState(null);
   console.log(forecastflowData)

  // hooks for local modal state (shown or hidden)
  const [open, setOpen] = useToggle(false);
  const [type, setChartType] = useState(null);

  
  // get gage data objects from API response
  function cleanGageData(data) {
    let gageData = data.data.value.timeSeries[0].values[0].value;
    return gageData;
  }

  // get gage Forecast data  from API response
      // clean stageData

  function cleanStageForecast(stage) {
    let stageDatas = stage.map(data=>{
      const timeData = data.children[0].value
      const stageData = data.children[1].value
      const newObj = {value:stageData, dateTime:timeData}
      return newObj
    })
    return stageDatas;
  }
      //clean flowData

  function cleanFlowForecast(flow) {
    let flowDatas = flow.map(data=>{
      const timeData = data.children[0].value
      const flowData = Number(data.children[2].value)*1000
      const newObj = {value:flowData, dateTime:timeData}
      return newObj
    })
    return flowDatas;
  }

  function handleChartClick(type) {
    setChartType(type)
    setOpen()
  }

  function largeChart() {
    if({type} === 'flow') {
      return <LargeFlowChart></LargeFlowChart>
    } else if ({type} === 'stage') {
      return <LargeStageChart></LargeStageChart>
    }
  }


  // update info displayed in dashboard when currentGage
  useEffect(() => {

    if (currentGageID) {
      // clean and set flow data for selected gage, if available
      API.getGagesHistory(currentGageID, "flow").then(response => {
        if (response.data.value.timeSeries[0]) {
          // let val = response.data.value.timeSeries[0].values[0].value[0].value;
          setFlowData(cleanGageData(response));
        } else {
          setFlowData("no flow data available");
        }
      });
      // clean and set stage data for selected gage, if available
      API.getGagesHistory(currentGageID, "stage").then(response => {
        if (response.data.value.timeSeries[0]) {
          // let val = response.data.value.timeSeries[0].values[0].value[0].value;
          setStageData(cleanGageData(response));
        } else {
          setStageData("no flow data available");
        }
      });

    }
  // get forcast data parse, clean and set the data

  if(currentGageID === "02055000"){
    API.getGagesForecast.then(
      async(res) => {
        const xmlString = await new xmlTostring().parseFromString(res.data);
        const forecastData = xmlString.children[7].children
        setForecastStageData(cleanStageForecast(forecastData))
        setForecastFlowData(cleanFlowForecast(forecastData))
      }
    )
    .catch((err) => {console.log( err)})
  }else {
        setForecastStageData([])
        setForecastFlowData([])
  }


  },[currentGageID]);

  return (
    <>
    {/* if a gage is selected (props passed w/ current gage name), return dashboard container.  Else return empty fragment. */}
    {currentGageName ? 
        <Container className="dashboardWrapper"> 
          <h5 id="dashboardTitle">{currentGageName}</h5>            
          <div >
          <p className="gageInfo">
            <span class="gageInfoItem">gage ID: {currentGageID}</span>
            {currentGageDatum ? <span class="gageInfoItem">datum: {currentGageDatum}ft <small>NAVD88</small></span> : <></>}
            <span class="gageInfoItem">owner: USGS</span>
          </p>

          </div>
            <Col >
              <Row>
                <div className="dashboardItem">
                  <h6>Current Status</h6>
                  <p class="dashboardStats">
                    Stage: { (stageData &&  stageData[stageData.length - 1 ].value) ? stageData[stageData.length - 1 ].value + " ft" : "no stage data available"}
                    <br></br>
                    Flow: {(flowData && flowData[flowData.length - 1 ].value) ? flowData[flowData.length - 1 ].value + " cfs": "no flow data available"}
                    <br></br>                  
                    {currentGageDatum && stageData ? 
                    <>Elevation: {(parseFloat(currentGageDatum) + parseFloat(stageData[stageData.length - 1].value)).toFixed(1)} ft </>
                    : 
                    <></>}
                  </p>
                  <small>last reading: 
                    { (stageData && stageData[stageData.length - 1 ].dateTime) ? "   " + moment(stageData[stageData.length - 1 ].dateTime).format('D MMM HH:mm')
                      : null
                    }
                  </small>
                </div>
              </Row>
              <Row>
                <div key={"stage"} className="dashboardItem" >
                  <h6>Stage Chart (ft)</h6>
                  { (stageData &&  stageData[stageData.length - 1 ].value) ? 
                  <div onClick={() => handleChartClick('stage')}>
                  <SmallStagechart data={stageData} forecastData={forecaststageData} />
                  </div>
                  :
                  <p>no stage data for this gage</p>
                }
                </div>
              </Row>
              <Row>
                <div key={"flow"} className="dashboardItem" >
                  <h6>Flow Chart (cfs) </h6>
                  {(flowData && flowData[flowData.length - 1 ].value) ?
                  <div onClick={() => handleChartClick('flow')}>
                  <SmallFlowchart data={flowData} forecastData={forecastflowData} />
                  </div>
                  :
                  <small>no flow data for this gage</small>
                }
                </div>
              </Row>
            </Col>
          <Modal
            open={open} 
            toggle={setOpen}
          >
            <>
            {type === 'stage' ?
              <> 
              <h4>Stage Chart (ft)</h4>
              <LargeStageChart data={stageData}></LargeStageChart> 
              </>
              : 
              <>
              <h4>Flow Chart (cfs)</h4>
              <LargeFlowChart data={flowData}></LargeFlowChart>
              </>
            }
            </> 
         </Modal>
        </Container>
    :
            <></>

    }
    
    </>

    
  );
};

export default Dashboard;