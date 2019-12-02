import React, {useState, useEffect, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCss } from 'esri-loader';
import { Map, Scene} from '@esri/react-arcgis';
import Dashboard from './components/Dashboard2';
import SlimNav from './components/SlimNav';
import Nav from './components/Nav';
import Legend from './components/Legend'
import FeatureLayer from './components/FeatureLayer/index'


const App = () => {

  // hooks for global currentGageID and currentGageName state
  const [ currentMap, setMap ] = useState(null);
  const [ currentView, setView ] = useState(null);
   
     //create function to toggle the base map
     const zoomToGage = (log, lat)=>{
       const gageCenter = [log, lat]
       const newObj = {center:gageCenter, zoom:18, ui: {components: [] }}
       setMap({basemap:'satellite'})
       setView(newObj)
     }

    // get esrii default css
    loadCss();
  
    if(currentMap){
    
      return(<div>
      {/* create as sceneview w/ full page map TODO: move styling to index.css */}
      <SlimNav></SlimNav>
      <Nav />
      <Map 
        class="full-screen-map"
        style={{ width: '100vw', height: '100vh'}}
        mapProperties={currentMap}
        viewProperties={currentView}
        loaderOptions={{ css: true }}        
      >
        {/* render the feature layer of all gages*/}
        <FeatureLayer zoomToGage={zoomToGage} />
      </Map>
      {/* render dashboard component, pass selected gage info through*/}
      <Dashboard />
      <Legend />
      {/* <Sidebar></Sidebar> */}
    </div>)} else{
    return (
      <div>
        {/* create as sceneview w/ full page map TODO: move styling to index.css */}
        <SlimNav></SlimNav>
        <Nav />
        <Scene 
          class="full-screen-map"
          style={{ width: '100vw', height: '100vh'}}
          mapProperties={{ basemap:  'topo-vector' }}
          viewProperties={{
            center: [-79.9414, 37.2710],
            zoom: 13,
            ui: {components: [] }
          }}     
        >
          {/* render the feature layer of all gages*/}
          
          <FeatureLayer zoomToGage={zoomToGage} />
        </Scene>
        {/* render dashboard component, pass selected gage info through*/}
        <Dashboard />
        <Legend />
        {/* <Sidebar></Sidebar> */}
      </div>
      
    );
          }
}

export default App;

