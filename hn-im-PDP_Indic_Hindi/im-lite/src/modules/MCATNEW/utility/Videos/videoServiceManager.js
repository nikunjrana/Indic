import makeRequest from '../../../../Globals/RequestsHandler/makeRequest';

let videoService = {
  getVideoData: (mcatid) => {
    let url = '/ajaxrequest/videos/mcatVideos?' + 'mcatid=' + mcatid;
    let method = 'GET';
    return makeRequest(method, url,'','',3000);
  },
}

export default videoService;
