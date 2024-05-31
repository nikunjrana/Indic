module.exports = (req,res,service_options,isString)=>{
    var request = require("request");
    var v4iilex = {};
    var imesh = {};
    var iploc = {};
    var im_iss='';
    let im_iss_obj = {}
    if(req.cookies.im_iss){
        let arr = req.cookies.im_iss.split('=')
        im_iss_obj[arr[0]] = arr[1];
    }
    if(req.cookies.ImeshVisitor !== undefined){
    req.cookies.ImeshVisitor.split('|').forEach(function(x){
        var arr = x.split('=');
        if(arr[1]==""){imesh[arr[0]] = ""}
        arr[1] && (imesh[arr[0]] = arr[1]);
    });
   }
   if(req.cookies.v4iilex !==undefined){
     req.cookies.v4iilex.split('|').forEach(function(x){
        var arr = x.split('=');
        if(arr[1]==""){v4iilex[arr[0]] = ""}
        arr[1] && (v4iilex[arr[0]] = arr[1]);
    });
    }
    if(req.cookies.iploc !==undefined){
        req.cookies.iploc.split('|').forEach(function(x){
           var arr = x.split('=');
           if(arr[1]==""){iploc[arr[0]] = ""}
           arr[1] && (iploc[arr[0]] = arr[1]);
       });
       }
    if(req.cookies.im_iss !== undefined){
    im_iss=req.cookies.im_iss;
    }
    if(imesh !== {} && v4iilex !== {}){
    if((v4iilex.id == imesh.glid)  && (im_iss !== '')){
    var data = {
        "username": (imesh.mb1!== undefined && imesh.mb1!== '' && imesh.iso=="IN")?imesh.mb1:imesh.em,
        "modid": 'IMOB',
        "ip": "",
        "format": 'JSON',
        "reauth": 1,
        "iso": imesh.iso,
        glusr_usr_ip : (iploc.gip)?iploc.gip:'',
        "cookie": {
            'DataCookie': imesh,
            'LoginCookie': v4iilex,
            'im_iss': im_iss_obj
        }
    };
    var response_reauth;
    function setImCookie(e) {
        var i = e;
        i = separateInPipeFormat(e);
        return i;
    }
    function separateInPipeFormat(e) {
        var i = new Array;
        for (var a in e)
            i.push(a + "=" + e[a]);
        return i.join("|")
    }
    var options = {
        method: 'POST',
        url: 'http://login.indiamart.com/user/reauthenticate/',
        form: JSON.stringify(data)
    };
    return new Promise(function(resolve, reject){
        request(options, function (error, response, body) {
            if (error) {return reject(error);}
            else{
                
                body=JSON.parse(body);
                if((body.access) && (body.access== 1 || body.access == 2)){
                if((body.LoginCookie.au == v4iilex.au) && (body.LoginCookie.id == v4iilex.id)&& (body.DataCookie.glid == imesh.glid))
                {   
                    response_reauth=true;
                    if(service_options !== undefined && service_options !== null){
                    var updated_imesh=setImCookie(body.DataCookie);
                    var updated_v4iilex=setImCookie(body.LoginCookie);
                    var updated_im_iss=setImCookie(body.im_iss);
                    res.cookie("ImeshVisitor",updated_imesh,{ maxAge: 15552000000, domain:'.indiamart.com', sameSite: 'Lax'});
                    res.cookie("v4iilex",updated_v4iilex,{ maxAge: 2592000000, domain:'.indiamart.com', sameSite: 'Lax'});
                    res.cookie("im_iss",updated_im_iss,{ maxAge: 2592000000, domain:'.indiamart.com', sameSite: 'Lax'});
                    var service_ak = isString ? JSON.parse(service_options.form) : service_options.form;
                    service_ak.AK=body.im_iss.t;
                    service_options.form = isString ? JSON.stringify(service_ak) : service_ak;
                    request(service_options, function(error,response,body){
                        if (error) {return reject(error);}
                        else{
                            var service_body=JSON.parse(body);
                            if(service_body.code == 200){
                            res.send(body);
                            }
                            else if(service_body.code == 402 || service_body.code == 400){
                                var date_string=new Date().toISOString().slice(0, 10);
                               var reauthserviceLog=fs.createWriteStream('/tmp/reAuthPwaLog-'+ date_string +'.log', { flags: 'a' });        
                               reauthserviceLog.write(new Date().toJSON().slice(0,19).split("T")[0]+"\t"+req.cookies.ImeshVisitor+"\t"+service_options.url+"\t"+service_body.code+"\t"+service_body+"\t"+"is_pwa");
                                res.send({response_reauth: false});
                            }
                            else{
                            res.send(body);
                            }
                            }
                    })
                }
                else{
                    res.send({response_reauth: true});
                }
                    resolve(response_reauth);
                }
                else{
                    response_reauth=false;            
                    res.send({response_reauth: false});
                    resolve(response_reauth);
                }
            }
        
        else if((body.access) && (body.access== 4)){
            if((body.DataCookie.glid == imesh.glid))
                {
                    response_reauth=4;
                    res.send({response_reauth: 4});
                    resolve(response_reauth);
                }
                else{
                    response_reauth=false;
                    res.send({response_reauth: false});
                    resolve(response_reauth);
                }
        }
        else{
            response_reauth=true;
            res.send({response_reauth: true});
            resolve(response_reauth);
        }
        }
        })
    })
}
else{
    response_reauth=false;
    return new Promise(function(resolve, reject){resolve(response_reauth);});
}
}
else{
    response_reauth=true;
    return new Promise(function(resolve, reject){resolve(response_reauth);});
}
}