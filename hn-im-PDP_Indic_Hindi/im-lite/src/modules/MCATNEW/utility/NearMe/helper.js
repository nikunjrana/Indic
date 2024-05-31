import mcatApi from '../../../../api/impcatApi';
export const  setCityLatLong = (lat, long,flName) =>{
    const pr = new Promise((resolve,reject)=>{
      mcatApi.getCityLatLongValue(lat, long).then((res) => {
        if(res.status == 200 && res.response){
          if(res.response.CODE == "200"){
            let city = res.response.cityname.toLowerCase();
            let cityArr = city.split(' ');
            let cityFlName = '';
            if(cityArr.length>1){
              for(let i=0;i<cityArr.length;i++){
                cityFlName += (i > 0? '-':'') + cityArr[i];
              }
            }
            else cityFlName = city;
            sessionStorage.setItem("CTDC", cityFlName);
            let url = "/city/" + cityFlName + "/" + flName + ".html";
            resolve(url)
          }
          else
          reject(res)
        }
        else
        reject(res)
      })
      .catch(error=>{
        reject(error)
      })
    })
    return pr;
   
  }