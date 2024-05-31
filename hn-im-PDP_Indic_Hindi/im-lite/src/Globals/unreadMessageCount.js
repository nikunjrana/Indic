import { getCookieValByKey } from './CookieManager';
import getMsgCount from './getMsgCount';
export const updateUnreadMsg = (count, time, glid,page='') => {
    var localst = JSON.parse(localStorage.getItem("multi_purpose"));
    if (localst == null || localst == 'undefined') {
        localst = {};
    }
    localst['count'] = count>99?"99+":count;
    localst['time'] = time;
    localst['glid'] = glid;
    localStorage.setItem("multi_purpose", JSON.stringify(localst));
    if(count<=0)
    {
        (document.getElementById('homeMsgIconCount')) ? document.getElementById('homeMsgIconCount').style.display="none":'';
        
    }

    if (count != "" && count > 0) {
        count > 99 ? count = "99+" : count;
        (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = count : '';
        (document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' (' + count + ')' : '';
        (document.getElementById('stFttrCountMssg')) ? document.getElementById('stFttrCountMssg').innerHTML = count : '';
       if(page=="home"){
           //eventlistner for message count 
           let msg=new CustomEvent("showMsgCount",{detail: count});
                    document.dispatchEvent(msg);
       }
    }
    else if(count=="99+")
    {
        (document.getElementById('stFttrCountMssg')) ? document.getElementById('stFttrCountMssg').innerHTML = count : '';

    }
}

export const countUnreadMessages = (isMenu = false, handleHeaderCount = '', displayForZero = '',page='',setUnreadCount='') => {
    var glid = getCookieValByKey('ImeshVisitor', 'glid');
    if (glid) {
        var localst = JSON.parse(localStorage.getItem("multi_purpose"));
        var self = this;
        var localGlid = glid
            , localTime = 0
            , c = 0
            , curTime = new Date
            , localCount = "";
        if (localst !== "" && localst !== null) {
            if (typeof (localst['count']) !== "" && typeof (localst['count']) !== "undefined") {
                localCount = localst['count'];
                localTime = localst['time'];
                var s = curTime.getTime() - new Date(localTime).getTime();
                c = Math.floor(s / 1e3 / 60 / 60);
                localGlid = localst['glid'];
            }
        }
        let hitService = (!isMenu && (/(^\/messages\/$)|(^\/$)/g).test(location.pathname));
        if ((glid && (0 == localTime || c >= 4) || glid != localGlid) || hitService) {
            getMsgCount().then(function (data) {
                if (data.response && data.statusText == 'ok') //status-OK
                {
                    if (null != data.response && "200" == data.response.code) {
                        var count = data.response.count;
                        if (null == count) {
                            count = 0;
                        }
                        if (count != "" && count > 0) {
                            if(typeof(setUnreadCount)=="function")
                            {
                                setUnreadCount(count);
                                
                            }
                              
                            if(page=="Home"){
                            let msgWig=new CustomEvent("showMsgWidget");
                            document.dispatchEvent(msgWig);
                            }
                            count > 99 ? count = "99+" : count;

                            handleHeaderCount ? handleHeaderCount(count) : '';
                        }
                        if (count == 0 && displayForZero && handleHeaderCount) {
                            handleHeaderCount('')
                        }

                        updateUnreadMsg(count, curTime, glid);
                    }
                }
            });
        } else {
            if (localCount !== "" && localCount > 0) {
                localCount > 99 ? localCount = "99+" : localCount;
                handleHeaderCount ? handleHeaderCount(localCount) : '';

                (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = localCount : '';
                (document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' (' + localCount + ')' : '';
            }


        }
    }
}
