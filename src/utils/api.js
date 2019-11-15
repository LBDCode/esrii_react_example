import axios from "axios";

export default {

    // get historical stage and flow data from USGS API
    getGagesHistory: function(gageID, paramType) {
        const paramID = paramType === 'flow' ? "00060" : "00065";
        const apiURL = 'https://waterservices.usgs.gov/nwis/iv/?format=json'
        const sites = '&sites=' + gageID;
        const startDateTime = '&startDT=2019-11-09';
        const typeParams = '&parameterCd=' + paramID;
        const siteStatus = '&siteStatus=all';

        let query = apiURL + sites + startDateTime + typeParams + siteStatus;
        return axios.get(query);
    },

    // TODO add call to NOAA

};