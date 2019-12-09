import React, {useEffect, useState, useRef} from 'react';
import { loadModules } from 'esri-loader';
import { useGlobal } from 'reactn';

const MapLayer = () => {
    const mapRef = useRef();
    const [currentZoom, setZoom] = useState(13)
    const [currentCeneter, setCenter]= useState([-79.9414, 37.2710])
    const [ currentGageID, setGageID ] = useGlobal('currentGageID');
    const [ currentGageName, setGageName ] = useGlobal('currentGageName');
    const [ currentGageDatum, setGageDatum ] = useGlobal('currentGageDatum');
    const imageryUrl = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"    
    const mapUrl = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
  
    // hook for global sidebar toggle state
  const [ sidebarOpen, setSidebarState] = useGlobal('sidebarOpen');


  const toggleDrawer = (open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setSidebarState(open);
      // setState({ left: open });
    };
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/TileLayer', 'esri/layers/FeatureLayer'])
      .then(([Map, MapView, TileLayer, FeatureLayer]) => {
        //create renderer for the feature class
        var renderer = {
          type: "unique-value",  // autocasts as new UniqueValueRenderer()
          field: "CONDITION_TXT",
          defaultSymbol: { type: "picture-marker" },  // autocasts as new SimpleFillSymbol()
          uniqueValueInfos: [{
            type: "picture-marker",
            value: "Near Flooding",
            symbol:  {
              type: "picture-marker",
              url :"https://res.cloudinary.com/teddyzenebe/image/upload/v1575489505/allpins/Y/ORX.png",
              width:"30px",
              height:"30px"
          }
          }, {
            type: "picture-marker",
            value: "Normal",
            symbol:  {
              type: "picture-marker",
              url :"https://res.cloudinary.com/teddyzenebe/image/upload/v1575488857/allpins/G/XCX.png",
              width:"30px",
              height:"30px"
          }
          }, {
            type: "picture-marker",
            value: "Minor Flooding",
            symbol:  {
              type: "picture-marker",
              url :"https://res.cloudinary.com/teddyzenebe/image/upload/v1575489384/allpins/R/XFX.png",
              width:"30px",
              height:"30px"
          }
          }, {
            type: "picture-marker",
            value: "Moderate Flooding",
            symbol:  {
              type: "picture-marker",
              url :"https://res.cloudinary.com/teddyzenebe/image/upload/v1575489357/allpins/P/XFX.png",
              width:"30px",
              height:"30px"
          }
          }],
        }

        // create Layer for all gages
        const featureLayer = new FeatureLayer({
          url: "https://services2.arcgis.com/tUcNZGjl0sYxJaxf/arcgis/rest/services/Roanokegages/FeatureServer/0",
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["*"],
          opacity: 1.0,
          supportsPagination: true,
          refreshInterval: 15,
          renderer: renderer
        })  

        const basemap = new TileLayer(
                            {
                                url:mapUrl,
                                maxScale:   36112
                            }
                        );

        

        const imagery = new TileLayer(imageryUrl, 0);
        
        const map = new Map({
              }); 
        // load the map view at the ref's DOM node
        const view = new MapView({
          container: "viewDiv" ,
          map: map,
          center:  currentCeneter,
          zoom: currentZoom,
        });

        map.add(basemap)
        map.add(imagery, 0)
        map.add(featureLayer); 
        view.ui.move("zoom", "bottom-left");

        view.on("click", function(evt) {
          const screenPoint = evt.screenPoint;   
          // esri hitTest() methodchecks to see if any graphics in the view
          // intersect the given screen point
          view.hitTest(screenPoint)
            .then(getFeature)
            toggleDrawer(true);
      });

      const getFeature = (response) =>{
          // the topmost graphic from the click location
          // and display select attribute values from the
          // layer to the user
          const attributes = response.results[0].graphic.attributes;  
          // set the global gageID, gageDatum and gageName state to attributes of selected gage
          setGageID(attributes.SITE_ID);
          setGageName(attributes.NAME);
          setGageDatum(attributes.GAGE_DATUM);
          setCenter([attributes.LONGITUDE, attributes.LATITUDE])
          setZoom(18)
        }

        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
          }
        };
      });

  return(
    <div
          className="full-screen-map"
          style={{ width: '100vw', height: '100vh'}}
          id="viewDiv"    
        /> 
  )

}
export default MapLayer;

//see this for reference
  
//https://github.com/tomwayson/create-arcgis-app/blob/master/src/components/ExtentsMap.js

