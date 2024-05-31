import { getCookieValByKey } from '../../../Globals/CookieManager';
import { getUserCity } from '../../Widgets/LocationFilter/dispatchFilterLocations'

let imeshCity = getCookieValByKey("ImeshVisitor", "iso");
let cityName;
let flag = 1
if(sessionStorage.getItem("userCity")){
  cityName = sessionStorage.getItem("userCity");
}
else{
  if (getCookieValByKey("ImeshVisitor", "ctid") && flag) {
      getUserCity()
        .then((response) => {
          flag=0
          cityName = response.cityname;
          cityName = cityName && cityName.toLowerCase();
        })
  }
  else {
    cityName = getCookieValByKey("iploc", "gctnm");
  }
}
export default function updatedCityDataList(cityData = []) {
  let nearestCityData = [];
  if (imeshCity && cityName) {
    let city = cityData ? cityData.filter((item) => {
      item.NAME && item.NAME.toLowerCase() == cityName ? nearestCityData.push(item) : "";
      return item.NAME && item.NAME.toLowerCase() != cityName;
    })
      : "";
    return [...nearestCityData, ...city];
  }
  else {
    let city = cityData ? cityData.filter((item) => {
      item.NAME == cityName ? nearestCityData.push(item) : "";
      return item.NAME != cityName;
    })
      : "";
    return [...nearestCityData, ...city];
  }
}
