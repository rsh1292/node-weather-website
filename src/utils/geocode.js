const axios = require('axios');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoicmlzaGFiaDExMiIsImEiOiJja3A0ZHJpYmMxamZnMm9td3Y3azA2enoxIn0.qOth1dneka7zaAYH0G_f2Q&limit=1'

    axios.get(url)
    .then(res=>{
        if(res.data.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
                    callback(undefined, {
                latitude: res.data.features[0].center[1],
                longitude: res.data.features[0].center[0],
                location: res.data.features[0].place_name
        })
    }
    })
    .catch(err=>callback("Network Issues!", undefined))
}

module.exports = geocode