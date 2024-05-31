const getCityData = (cityData)=>{
      
    let data = {
        evenCityData : [],
        oddCityData : []
    }
    let count = cityData ? cityData.length : 0 ;
    if(count >25 ) count=25;

    if(count < 3){
        data.evenCityData = cityData
    }
    else{

        for (let [i,item] of Object.entries(cityData)){
            if(i>25) break;
            if(i%2 == 0)
            data.evenCityData.push(item);
            else 
            data.oddCityData.push(item);
            
        }
    }

    return data;

}

export default getCityData;