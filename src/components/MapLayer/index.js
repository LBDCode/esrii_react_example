import React, {useEffect, useState} from 'react';
import { loadModules } from 'esri-loader';
import { useGlobal } from 'reactn';
import Data from '../../utils/dummydata';

const MapLayer = () => {
    const [currentZoom, setZoom] = useState(13)
    const [currentCeneter, setCenter]= useState([-79.9414, 37.2710])
    const [ currentGageID, setGageID ] = useGlobal('currentGageID');
    const [ currentGageName, setGageName ] = useGlobal('currentGageName');
    const [ currentGageDatum, setGageDatum ] = useGlobal('currentGageDatum');
    
  
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
      loadModules(['esri/Map', 'esri/views/MapView','esri/Basemap', 'esri/widgets/BasemapGallery', 'esri/layers/TileLayer', 'esri/layers/FeatureLayer'])
      .then(([Map, MapView, Basemap, BasemapGallery, TileLayer, FeatureLayer]) => {
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
              url :`${Data.gagePinsUrl}Y/ORX.png`,
              width:"30px",
              height:"30px"
          }
          }, {
            type: "picture-marker",
            value: "Normal",
            symbol:  {
              type: "picture-marker",
              url :`${Data.gagePinsUrl}G/XCX.png`,
              width:"30px",
              height:"30px"
          }
          }, {
            type: "picture-marker",
            value: "Minor Flooding",
            symbol:  {
              type: "picture-marker",
              url :`${Data.gagePinsUrl}R/XFX.png`,
              width:"30px",
              height:"30px"
          }
          }, {
            type: "picture-marker",
            value: "Moderate Flooding",
            symbol:  {
              type: "picture-marker",
              url :`${Data.gagePinsUrl}P/XFX.png`,
              width:"30px",
              height:"30px"
          }
          }],
        }

        // create Layer for all gages
        const featureLayer = new FeatureLayer({
          url: Data.gageUrl,
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["*"],
          opacity: 1.0,
          supportsPagination: true,
          refreshInterval: 15,
          renderer: renderer
        })  

        const topomap = new TileLayer(
                            {
                                url:Data.mapUrl,
                                maxScale:   36112
                            }
                        );

        

        const imagery = new TileLayer({
          url:Data.imageryUrl,
          minScale:   36112
      });

      var defaultBasemap = new Basemap({
        baseLayers: [topomap, imagery],
        title: "Roanoke Basemap and Imagery",
        id: "roanokeBasemap"
    });
        
        const map = new Map({
          basemap:defaultBasemap
              }); 
        // load the map view at the ref's DOM node
        const view = new MapView({
          container: "viewDiv" ,
          map: map,
          center:  currentCeneter,
          zoom: currentZoom,
        });
        map.add(featureLayer); 
        const basemapGallery = new BasemapGallery({
          view: view,
          container: document.createElement("div")
        });
        view.ui.add(basemapGallery, {
          position: "top-right"
        });
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

