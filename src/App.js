import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCss } from 'esri-loader';
//import {Scene} from '@esri/react-arcgis';
import Dashboard from './components/Dashboard2';
import SlimNav from './components/SlimNav';
import Nav from './components/Nav';
import Legend from './components/Legend'
import  MapLayer from "./components/MapLayer/index"


const App = () => {

    // get esrii default css
    loadCss();
    
    
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
    return (
      <div>
        <SlimNav></SlimNav>
        <Nav />
        {/* render mapLayer component, whch include the feature class and different basemap layer*/}
        <MapLayer />     
        {/* render dashboard component, pass selected gage info through*/}
        <Dashboard />
        <Legend />
        {/* <Sidebar></Sidebar> */}
      </div>
      
    );
}

export default App;

