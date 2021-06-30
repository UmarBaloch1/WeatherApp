const request = require('request')
const chalk = require('chalk')


const forecast= (address,callback) =>{

const url = 'http://api.openweathermap.org/data/2.5/weather?q='+address+'&units=metric&appid=e36ccce27a5a1a28338d218d55f67e84'

request({url, json:true}, (error,{body}) =>{
    if(error){
        callback('Unable to connect to the Internet',undefined)
    }
     else if(body.cod===400){
         callback('unable to find location', undefined)
    }
     else{
         callback(undefined, 'The temprature in  ' + body.name + '  is about ' + body.main.temp + ' C')
    }
   
})
}

module.exports = forecast
