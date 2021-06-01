const axios = require('axios');
const forecast = (latitude, longitude, callback) => {
 
    const url = `http://api.weatherstack.com/current?access_key=394fa331396ef380709e742bad6d2238&query=${latitude},${longitude}`

    axios.get(url)
    .then(resp=>{
        if(resp.data){
        callback(undefined, resp.data.location.country + ' It is currently ' + resp.data.current.temperature + 
        ' degress out. There is a ' + resp.data.current.precip + ' % chance of rain.')
    }else{
        console.log(resp.data.error,undefined);
    }
    })
    .catch(err=>callback(err,undefined));
}

module.exports = forecast