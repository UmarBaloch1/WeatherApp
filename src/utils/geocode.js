const request = require('request')
const chalk = require ('chalk')

const geocode = (address,callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidW1hcjE2NTg3OCIsImEiOiJja210ZnB0cnEwcmdzMnByczMxa2FqYzluIn0.Nq8o8ipbA1T4jCLiRueqWw'

request({ url , json:true }, (error, {body}='error' ) => {
    if(error){
       callback('Unable to Connect To the Server 2', undefined)
    }
    else if(body.message ==='Not Found'){
        callback('location not found', undefined)
    }
    else{
   const longitude = body.features[3].center[0].toFixed(2)
   const latitude =  body.features[3].center[1].toFixed(2)

    callback(undefined, 'Longitude is = ' + longitude + ' Latitude is = ' + latitude )
    }
})
}

module.exports = geocode