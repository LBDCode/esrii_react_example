import React from 'react';
import {useState} from 'react'
import Current from '../../images/allpins/legend/CURRENT.png';
import Forecast from '../../images/allpins/legend/FORECAST.png';
import Normal from '../../images/allpins/legend/GXXX.png';
import Monitor from '../../images/allpins/legend/YXXX.png';
import Minor from '../../images/allpins/legend/OXXX.png';
import Moderate from '../../images/allpins/legend/RXXX.png';
import Major from '../../images/allpins/legend/PXXX.png';
import NotRisk from '../../images/allpins/legend/BXXX.png';
import OutofService from '../../images/allpins/legend/XXXX.png';
import Rising from '../../images/allpins/legend/BXRX.png';
import Falling from '../../images/allpins/legend/BXFX.png';
import Constant from '../../images/allpins/legend/BXCX.png';

const Legend = () => {  

    const [ currentVisiblity, setvisiblity ] = useState({visibility: "visible"});

    function toggleLegend(e){
        e.preventDefault()
        setvisiblity({
            visibility: "hidden"
          })
    }

    return (

        <div className="lagend" style={currentVisiblity} >
            <h5 className="Main-Legend-Titel"><strong>Gage Level</strong> <span className="toggle-Legend" onClick={toggleLegend} >X</span></h5>
            <div>
                <h6 className="small-Legend-Titel" ><strong>Gage Symbols</strong></h6>
                <div>
                    <img src={Current} alt="Current" /> <small>Current Condition</small><br/>
                    <img src={Forecast} alt="Forecast" /> <small>Forecast Peak Condition</small><br/>
                </div>
            </div>
            <div>
                <h6 className="small-Legend-Titel" ><strong>Risk Ratings</strong></h6>
                <div>
                    <img src={Normal} alt="Normal"/> <small>Normal</small> <br/>
                    <img src={Monitor} alt="Monitore" /> <small>Monitor</small><br/>
                    <img src={Minor} alt="Minor" /> <small>Minor Flooding</small><br/>
                    <img src={Moderate} alt="Moderate" /> <small>Moderate Flooding</small><br/>
                    <img src={Major} alt="Major" /> <small>Major Flooding</small><br/>
                    <img src={NotRisk} alt="NotRisk" /> <small>Not Risk Rated</small><br/>
                    <img src={OutofService} alt="OutofService" /> <small>Out Of Service</small><br/>
                </div>
            </div>
            <div>
                <h6 className="small-Legend-Titel"><strong>Trend</strong></h6>
                <div>
                    <img src={Rising} alt="Rising" /> <small>Rising</small><br/>
                    <img src={Falling} alt="Falling" /> <small>Falling</small><br/>
                    <img src={Constant} alt="Constant" /> <small>Constant</small>
                </div>
            </div>
        </div>

        )
}


export default Legend;