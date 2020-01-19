import React, {useState, useEffect, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCss } from 'esri-loader';
//import {Scene} from '@esri/react-arcgis';
import Dashboard from './components/Dashboard2';
import SlimNav from './components/SlimNav';
import Nav from './components/Nav';
import Legend from './components/Legend'
// import  MapLayer from "./components/MapLayer/index"
import Button from 'react-bootstrap/Button'
import  MapLayer2 from "./components/MapLayer2/index"

class App  extends Component {
  constructor(props) {
    super(props);
    // a ref to the DOM node where we want to create the map
    // see: https://reactjs.org/docs/refs-and-the-dom.html
    this.state = {
      center: [-79.9414, 37.2710]
    }
  }

    // get esrii default css

    
    //   return(<div>
    //   {/* create as sceneview w/ full page map TODO: move styling to index.css */}
    //   <SlimNav></SlimNav>
    //   <Nav />
    //   <Scene
    //     class="full-screen-map"
    //     style={{ width: '100vw', height: '100vh'}}
    //     mapProperties={currentMap}
    //     viewProperties={currentView}
    //     loaderOptions={{ css: true }}        
    //   >
    //     {/* render the feature layer of all gages*/}
    //     <Gage Points zoomToGage={zoomToGage} />
    //   </Map>
    //   {/* render dashboard component, pass selected gage info through*/}
    //   <Dashboard />
    //   <Legend />
    //   {/* <Sidebar></Sidebar> */}
    // </div>)
    render() {

      return (
        <div>
          <SlimNav></SlimNav>
          <Nav />
          {/* render mapLayer component, whch include the feature class and different basemap layer*/}
          <MapLayer2 center={this.state.center} />     
          {/* render dashboard component, pass selected gage info through*/}
          <Dashboard />
          <Legend />
          <Button id="clickTester" onClick={() => this.setState({center : [150.644, -34.397]})}variant="primary">Primary</Button>
                  {/* <Sidebar></Sidebar> */}
        </div>
        
      );
  
    }
}

export default App;

