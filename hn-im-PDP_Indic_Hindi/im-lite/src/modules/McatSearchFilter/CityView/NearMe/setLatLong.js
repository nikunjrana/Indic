import { getCookie, getCookieValByKey } from '../../../../Globals/CookieManager';
import makeREQUEST from '../../../../Globals/RequestsHandler/makeRequest';

const getCityLatLongValue = (lat, long) => {
  let data = {
    'token': 'imartenquiryprovider',
    'S_lat': lat,
    'S_long': long,
    'GET_CITY': 'Y',
    'modid': 'IMOB',

  }
  let url = '/ajaxrequest/identified/mcat/CityFromLatLong/'
  const method = 'POST';
  return makeREQUEST(method, url, data);
}

const iplocCityValue = () => {
  let city = '';
  if (getCookie('iploc') && getCookieValByKey('iploc', 'gctnm')) {
    city = getCookieValByKey('iploc', 'gctnm').toLowerCase();
  }
  return city;
}

export const setCityLatLong = (lat, long, flName, page) => {

  const pr = new Promise((resolve, reject) => {
    getCityLatLongValue(lat, long).then((res) => {
      if (res.status == 200 && res.response) {
        if (res.response.CODE == "200") {
          let city = res.response.cityname.toLowerCase();
          let cityArr = city.split(' ');
          let cityFlName = '';
          if (cityArr.length > 1) {
            for (let i = 0; i < cityArr.length; i++) {
              cityFlName += (i > 0 ? '-' : '') + cityArr[i];
            }
          }
          else cityFlName = city;
          sessionStorage.setItem("CTDC", cityFlName);
          let url = page == "Mcat" ? "/city/" + cityFlName + "/" + flName + ".html" : "/isearch.php?s=" + flName + "&cq=" + cityFlName;
          resolve(url)
        }
        else {
          if (iplocCityValue()) {
            let url = page == "Mcat" ? "/city/" + iplocCityValue() + "/" + flName + ".html" : "/isearch.php?s=" + flName + "&cq=" + iplocCityValue();
            resolve(url)
          } else reject(res)
        }
      }
      else {
        if (iplocCityValue()) {
          let url = page == "Mcat" ? "/city/" + iplocCityValue() + "/" + flName + ".html" : "/isearch.php?s=" + flName + "&cq=" + iplocCityValue();
          resolve(url)
        } else reject(res)
      }
    })
      .catch(error => {
        if (iplocCityValue()) {
          let url = page == "Mcat" ? "/city/" + iplocCityValue() + "/" + flName + ".html" : "/isearch.php?s=" + flName + "&cq=" + iplocCityValue();
          resolve(url)
        } else reject(error)
      })
  })
  return pr;

}