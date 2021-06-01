const geocode = (address,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=394fa331396ef380709e742bad6d2238&query=${address}`;
try{
    fetch(url)
    .then(res=>{
        if(res.status===200){
        res.json().then(resp=>{
            if(resp.current){
            callback(undefined,resp);
        }else{
        throw new Error(resp.error.info);
           }
        })
        .catch(err=>callback(err,undefined));
    }else{
         throw new Error(res.statusText);
        }

    })
    .catch(err=>callback(err,undefined))
}
catch(err){
    callback(err);
}
finally{

}
}

const weatherform = document.querySelector('form');
const input= document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(input.value){
        messageOne.textContent ="Loading..."
        geocode(input.value,(err,resp)=>{
            if(err){
                messageOne.innerHTML = `<span style="color:red">${err}</span>`;
                messageTwo.textContent = '';
            }else{
                messageOne.textContent = `Location : ${resp.location.name}`;
                messageTwo.textContent = `Location : ${resp.current.weather_descriptions[0]}`;
            }
        });
    }else{
        console.log("enter valid address");
    }
})

