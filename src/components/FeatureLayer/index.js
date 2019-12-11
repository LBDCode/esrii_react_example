// trying to create a separate feature components ... not yet used

import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { useGlobal } from 'reactn';

const FeatureLayer = (props) => {

    // hooks for global currentGageID and currentGageName state
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


    useEffect(() => {
        loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
            // create unique field rendnerer

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
            // renderer:
            // {
            //     type:"simple",
            //     symbol:  {
            //         type: "picture-marker",
            //         url :"https://picsum.photos/id/1/200/300",
            //         width:"30px",
            //         height:"30px"
            //     }
            // }
            
            })          
            props.map.add(featureLayer); 

            
            // add click listener to view and then hit test to see if point clicked
            props.view.on("click", function(evt) {
                const screenPoint = evt.screenPoint;   
                // esri hitTest() methodchecks to see if any graphics in the view
                // intersect the given screen point
                props.view.hitTest(screenPoint)
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
                props.zoomToGage(attributes.LONGITUDE, attributes.LATITUDE) 
                console.log(attributes)
              }

            
        }).catch((err) => console.error(err));
        

        // return function cleanup() {
        //     props.view.featureLayer.remove(featureLayer);
        // };
    }, []);

    return null;

}

export default FeatureLayer;