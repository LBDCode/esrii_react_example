export default {
    // basic data for roanoke gages, pulled from USGS - see notes.md for more info
    gageData: function(){
        return(
        [
        {id: "02054750", name: "ROANOKE RIVER AT ROUTE 117 AT ROANOKE, VA", lat: 37.27155556, long: "-80.00788889", datum: null},
        {id: "02055000", name: "ROANOKE RIVER AT ROANOKE, VA", lat: 37.259254, long:-79.938406, datum: 906.4},
        {id: "02055080", name: "ROANOKE RIVER AT THIRTEENTH ST BR AT ROANOKE, VA", lat: 37.26419444, long: -79.9154444, datum: null},
        {id: "02056000", name: "ROANOKE RIVER AT NIAGARA, VA", lat: 37.2551384, long: -79.87142539, datum: 819.50}
    ])
    },
    stageLevelData: function(){
        return(
            {
                "02054750": {normal: 1, monitor: 2, minor: 3, moderate: 5, major: 6},
                "02055000": {normal: 2, monitor: 3, minor: 4, moderate: 5, major: 7},
                "02055080": {normal: 1, monitor: 1.4, minor: 2.6, moderate: 3.6, major: 4.8},
                "02056000": {normal: 3, monitor: 4, minor: 5, moderate: 6, major: 8}
            }
        )
    },

     allValues : [
                  "B,X,X,X", "B,X,X,R", "B,X,C,X", "B,X,C,R", "B,X,F,X", "B,X,F,R", "B,X,R,X",
                  "B,X,R,R", "B,B,X,X", "B,B,X,R", "B,B,C,X", "B,B,C,R", "B,B,F,X", "B,B,F,R", 
                  "B,B,R,X", "B,B,R,R", "B,G,X,X", "B,G,X,R", "B,G,C,X", "B,G,C,R", "B,G,F,X", 
                  "B,G,F,R", "B,G,R,X", "B,G,R,R", "B,Y,X,X", "B,Y,X,R", "B,Y,C,X", "B,Y,C,R", 
                  "B,Y,F,X", "B,Y,F,R", "B,Y,R,X", "B,Y,R,R", "B,O,X,X", "B,O,X,R", "B,O,C,X", 
                  "B,O,C,R", "B,O,F,X", "B,O,F,R", "B,O,R,X", "B,O,R,R", "B,R,X,X", "B,R,X,R", 
                  "B,R,C,X", "B,R,C,R", "B,R,F,X", "B,R,F,R", "B,R,R,X", "B,R,R,R", "B,P,X,X", 
                  "B,P,X,R", "B,P,C,X", "B,P,C,R", "B,P,F,X", "B,P,F,R", "B,P,R,X", "B,P,R,R", 
                  "G,X,X,X", "G,X,X,R", "G,X,C,X", "G,X,C,R", "G,X,F,X", "G,X,F,R", "G,X,R,X", 
                  "G,X,R,R", "G,B,X,X", "G,B,X,R", "G,B,C,X", "G,B,C,R", "G,B,F,X", "G,B,F,R", 
                  "G,B,R,X", "G,B,R,R", "G,G,X,X", "G,G,X,R", "G,G,C,X", "G,G,C,R", "G,G,F,X", 
                  "G,G,F,R", "G,G,R,X", "G,G,R,R", "G,Y,X,X", "G,Y,X,R", "G,Y,C,X", "G,Y,C,R", 
                  "G,Y,F,X", "G,Y,F,R", "G,Y,R,X", "G,Y,R,R", "G,O,X,X", "G,O,X,R", "G,O,C,X", 
                  "G,O,C,R", "G,O,F,X", "G,O,F,R", "G,O,R,X", "G,O,R,R", "G,R,X,X", "G,R,X,R", 
                  "G,R,C,X", "G,R,C,R", "G,R,F,X", "G,R,F,R", "G,R,R,X", "G,R,R,R", "G,P,X,X", 
                  "G,P,X,R", "G,P,C,X", "G,P,C,R", "G,P,F,X", "G,P,F,R", "G,P,R,X", "G,P,R,R", 
                  "Y,X,X,X", "Y,X,X,R", "Y,X,C,X", "Y,X,C,R", "Y,X,F,X", "Y,X,F,R", "Y,X,R,X", 
                  "Y,X,R,R", "Y,B,X,X", "Y,B,X,R", "Y,B,C,X", "Y,B,C,R", "Y,B,F,X", "Y,B,F,R", 
                  "Y,B,R,X", "Y,B,R,R", "Y,G,X,X", "Y,G,X,R", "Y,G,C,X", "Y,G,C,R", "Y,G,F,X", 
                  "Y,G,F,R", "Y,G,R,X", "Y,G,R,R", "Y,Y,X,X", "Y,Y,X,R", "Y,Y,C,X", "Y,Y,C,R", 
                  "Y,Y,F,X", "Y,Y,F,R", "Y,Y,R,X", "Y,Y,R,R", "Y,O,X,X", "Y,O,X,R", "Y,O,C,X", 
                  "Y,O,C,R", "Y,O,F,X", "Y,O,F,R", "Y,O,R,X", "Y,O,R,R", "Y,R,X,X", "Y,R,X,R", 
                  "Y,R,C,X", "Y,R,C,R", "Y,R,F,X", "Y,R,F,R", "Y,R,R,X", "Y,R,R,R", "Y,P,X,X", 
                  "Y,P,X,R", "Y,P,C,X", "Y,P,C,R", "Y,P,F,X", "Y,P,F,R", "Y,P,R,X", "Y,P,R,R", 
                  "O,X,X,X", "O,X,X,R", "O,X,C,X", "O,X,C,R", "O,X,F,X", "O,X,F,R", "O,X,R,X", 
                  "O,X,R,R", "O,B,X,X", "O,B,X,R", "O,B,C,X", "O,B,C,R", "O,B,F,X", "O,B,F,R", 
                  "O,B,R,X", "O,B,R,R", "O,G,X,X", "O,G,X,R", "O,G,C,X", "O,G,C,R", "O,G,F,X", 
                  "O,G,F,R", "O,G,R,X", "O,G,R,R", "O,Y,X,X", "O,Y,X,R", "O,Y,C,X", "O,Y,C,R", 
                  "O,Y,F,X", "O,Y,F,R", "O,Y,R,X", "O,Y,R,R", "O,O,X,X", "O,O,X,R", "O,O,C,X", 
                  "O,O,C,R", "O,O,F,X", "O,O,F,R", "O,O,R,X", "O,O,R,R", "O,R,X,X", "O,R,X,R", 
                  "O,R,C,X", "O,R,C,R", "O,R,F,X", "O,R,F,R", "O,R,R,X", "O,R,R,R", "O,P,X,X", 
                  "O,P,X,R", "O,P,C,X", "O,P,C,R", "O,P,F,X", "O,P,F,R", "O,P,R,X", "O,P,R,R", 
                  "R,X,X,X", "R,X,X,R", "R,X,C,X", "R,X,C,R", "R,X,F,X", "R,X,F,R", "R,X,R,X", 
                  "R,X,R,R", "R,B,X,X", "R,B,X,R", "R,B,C,X", "R,B,C,R", "R,B,F,X", "R,B,F,R", 
                  "R,B,R,X", "R,B,R,R", "R,G,X,X", "R,G,X,R", "R,G,C,X", "R,G,C,R", "R,G,F,X", 
                  "R,G,F,R", "R,G,R,X", "R,G,R,R", "R,Y,X,X", "R,Y,X,R", "R,Y,C,X", "R,Y,C,R", 
                  "R,Y,F,X", "R,Y,F,R", "R,Y,R,X", "R,Y,R,R", "R,O,X,X", "R,O,X,R", "R,O,C,X", 
                  "R,O,C,R", "R,O,F,X", "R,O,F,R", "R,O,R,X", "R,O,R,R", "R,R,X,X", "R,R,X,R", 
                  "R,R,C,X", "R,R,C,R", "R,R,F,X", "R,R,F,R", "R,R,R,X", "R,R,R,R", "R,P,X,X", 
                  "R,P,X,R", "R,P,C,X", "R,P,C,R", "R,P,F,X", "R,P,F,R", "R,P,R,X", "R,P,R,R", 
                  "P,X,X,X", "P,X,X,R", "P,X,C,X", "P,X,C,R", "P,X,F,X", "P,X,F,R", "P,X,R,X", 
                  "P,X,R,R", "P,B,X,X", "P,B,X,R", "P,B,C,X", "P,B,C,R", "P,B,F,X", "P,B,F,R", 
                  "P,B,R,X", "P,B,R,R", "P,G,X,X", "P,G,X,R", "P,G,C,X", "P,G,C,R", "P,G,F,X", 
                  "P,G,F,R", "P,G,R,X", "P,G,R,R", "P,Y,X,X", "P,Y,X,R", "P,Y,C,X", "P,Y,C,R", 
                  "P,Y,F,X", "P,Y,F,R", "P,Y,R,X", "P,Y,R,R", "P,O,X,X", "P,O,X,R", "P,O,C,X", 
                  "P,O,C,R", "P,O,F,X", "P,O,F,R", "P,O,R,X", "P,O,R,R", "P,R,X,X", "P,R,X,R", 
                  "P,R,C,X", "P,R,C,R", "P,R,F,X", "P,R,F,R", "P,R,R,X", "P,R,R,R", "P,P,X,X", 
                  "P,P,X,R", "P,P,C,X", "P,P,C,R", "P,P,F,X", "P,P,F,R", "P,P,R,X", "P,P,R,R"
                ]

}
