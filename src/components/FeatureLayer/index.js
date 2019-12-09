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
            var renderer1 = {
                type: "unique-value",  // autocasts as new UniqueValueRenderer()
                field: "CONDITION_TXT",
                defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
                uniqueValueInfos: [{
                  type: "simple-fill",
                  value: "Near Flooding",
                  symbol:  {
                    type:"simple-marker",
                  color: "#FF00FF",
                  size: 15,
                  outline: {
                    color: [
                      0,
                      0,
                      255,
                      255
                    ],
                    width: 0.99975,
                    
                  }
                }
                }, {
                  type: "simple-fill",
                  value: "Normal",
                  symbol:  {
                    type:"simple-marker",
                  color: "#00FF00",
                  size: 15,
                  outline: {
                    color: [
                      100,
                      100,
                      128,
                      255
                    ],
                    width: 0.99975,
                    
                  }
                }
                }, {
                  type: "simple-fill",
                  value: "Minor Flooding",
                  symbol:  {
                    type:"simple-marker",
                  color:"#FFA500",
                  size: 15,
                  outline: {
                    color: [
                      0,
                      0,
                      128,
                      255
                    ],
                    width: 0.99975,
                    
                  }
                }
                }, {
                  type: "simple-fill",
                  value: "Moderate Flooding",
                  symbol:  {
                    type:"simple-marker",
                  color: "#FF0000",
                  size: 15,
                  outline: {
                    color: [
                      0,
                      0,
                      128,
                      255
                    ],
                    width: 0.99975,
                    
                  }
                }
                }],
              }

              var renderer2 = {
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
            //renderer: renderer1
            renderer: renderer2
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

            const setSymbolValue = (value) => {
                var conditionChar, forecastChar, trendChar, rainChar, symbolValue;
                const inServiceValue = value.attributes.IN_SERVICE;
                const conditionValue = value.attributes.CONDITION;
                const trendValue = value.attributes.TREND;
                const forecastValue = value.attributes.FORECAST_CONDITION;
                const rainValue = value.attributes.RAIN_CONDITION;
                if (inServiceValue == 1) {
                    if (conditionValue != null) {
                        switch (conditionValue) {
                            case 0:
                                conditionChar = "G";
                                break;
                            case 1:
                                conditionChar = "Y";
                                break;
                            case 2:
                                conditionChar = "O";
                                break;
                            case 3:
                                conditionChar = "R";
                                break;
                            case 4:
                                conditionChar = "P";
                                break;
                            default:
                                conditionChar = "B";
                                break;
                            }
                        switch (forecastValue) {
                            case null:
                                forecastChar = "X";
                                break;
                            case 0:
                                forecastChar = "G";
                                break;
                            case 1:
                                forecastChar = "Y";
                                break;
                            case 2:
                                forecastChar = "O";
                                break;
                            case 3:
                                forecastChar = "R";
                                break;
                            case 4:
                                forecastChar = "P";
                                break;
                            default:
                                forecastChar = "X";
                                break;
                            }
                        switch (trendValue) {
                            case null:
                                trendChar = "X";
                                break;
                            case "Constant":
                                trendChar = "C";
                                break;
                            case "Falling":
                                trendChar = "F";
                                break;
                            case "Rising":
                                trendChar = "R";
                                break;
                            }
                        switch (rainValue) {
                            case 1:
                                rainChar = "R";
                                break;
                            default:
                                rainChar = "X";
                                break;
                            }
                        symbolValue = conditionChar + "," + forecastChar + "," + trendChar + "," + rainChar;
                    } else {
                        symbolValue = "X,X,X,X";
                    }
                } else {
                    symbolValue = "X,X,X,X";
                }
        
                return symbolValue;
            }



        }).catch((err) => console.error(err));
        

        // return function cleanup() {
        //     props.view.featureLayer.remove(featureLayer);
        // };
    }, []);

    return null;

}

export default FeatureLayer;