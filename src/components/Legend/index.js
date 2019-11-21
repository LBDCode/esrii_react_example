import React from 'react';
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

    return (

        <div className="Lagend">
            <h4>Gage Level</h4>
            <div>
                <h5>Gage Symbols</h5>
                <div>
                    <img src={Current} /><br/>
                    <img src={Forecast} /><br/>
                </div>
            </div>
            <div>
                <h5>Risk Ratings</h5>
                <div>
                    <img src={Normal} /> <br/>
                    <img src={Monitor} /><br/>
                    <img src={Minor} /><br/>
                    <img src={Moderate} /><br/>
                    <img src={Major} /><br/>
                    <img src={NotRisk} /><br/>
                    <img src={OutofService} /><br/>
                </div>
            </div>
            <div>
                <h5>Trend</h5>
                <div>
                    <img src={Rising} /><br/>
                    <img src={Falling} /><br/>
                    <img src={Constant} />
                </div>
            </div>
        </div>

        )
}


export default Legend;