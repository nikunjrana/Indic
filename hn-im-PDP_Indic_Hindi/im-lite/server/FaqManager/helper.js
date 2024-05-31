const request = require("request");
const serviceUrl = require("../ajaxRequests/ServiceUrls");
const GblComFunc = require("../GblComFunc");
import { URLSearchParams } from 'url';
const Helper = {
    makeUrl(url,params){
        let urlAppend = new URLSearchParams();
        for (const key in params) {
           urlAppend.append(key, params[key]);
       }
       url = url + '?' + urlAppend;
       return url;
    },
    isFaqExists(mcatid){
        try{
            const mcatidsJSON= require('./mcatIds.json');
            if(mcatidsJSON.mcatids.includes(mcatid)){
                return true;
            }
            else{
                return false;
            }
           
        }
        catch(err){
            return err;
        }
        
    },
    processData(data){
        let ltarray = data.split("\r\n"); 
        let imgArry =[];
        let vdoArry = [];
        let prcImgVdoData= [];
        let parsedString ="";
        let parsedStringArry =[];
        let sprtArray = [];
        for(let i = 0;i<ltarray.length;i++){

            let pasredStringF="";
            if(ltarray[i] && ltarray[i].search(/\&lt\;img|\&lt\;iframe|embed|youtube|youtu\.be/i)>-1){
               ltarray[i] = ltarray[i].split('&lt');
               for (const v of ltarray[i]) {
                    if(v.search(/img|iframe|embed|youtube|youtu\.be|;br \//i)<0 && v){ 
                    sprtArray.push(v);
                    }
                    else if(v.search(/img|iframe|embed|youtube|youtu\.be/i)>-1){
                    prcImgVdoData.push(v);
                    }
              }
              if(sprtArray.length > 0){
                for(let j=0;j<sprtArray.length;j++){
                    if(sprtArray[j].search(/\;fancybox/i)>-1){
                        sprtArray[j] ="";
                        sprtArray[j+1] ="";
                        }
                    pasredStringF += sprtArray[j] ? sprtArray[j].search(/\&gt;/i)>-1? "&lt"+sprtArray[j]  : sprtArray[j] : "";
                    }
                }
              ltarray[i] = pasredStringF;
            }
            
        }
        for(let i=0 ; i < ltarray.length;i++){
            parsedString += ltarray[i]? ltarray[i]+"\r\n" :"";
          }
        for (const v of prcImgVdoData){
            if(v.search(/img/i)>-1){
              v = v? v.search(/\&gt;/i) ? "&lt"+ v  : v: "";
              imgArry.push(v);
            }
            if(v.search(/iframe|embed|youtube|youtu\.be/i)>-1){
              v = v ?v.search(/\&gt;/i)>-1? "&lt" + v  : v : ""; 
              vdoArry.push(v);
            }
          
        }
        parsedStringArry['html']=parsedString;
        parsedStringArry['img']=imgArry;
        parsedStringArry['video']=vdoArry;
       // return [parsedStringArry['html'],parsedStringArry['img'],parsedStringArry['video']]
        return parsedStringArry;
    },

    filterData(wsResult,mcatid,req,res){
        let fData = (resolve,reject)=>{
            let wsResultFinal = [];
            let miniDetailsQPromise = [];
            let miniDetailsAPromise = [];
            let qid = 0;
            // console.log("abce:", Array.isArray(wsResult['searchResult']['questions']['question']))
            if(wsResult['searchResult']['questions']['@totalCount'] > 0){
                if(!Array.isArray(wsResult['searchResult']['questions']['question']))
                wsResult['searchResult']['questions']['question'] = [wsResult['searchResult']['questions']['question']];
                // if(wsResult['searchResult']['questions']['@totalCount'] === '1'){
                //     let t=wsResult['searchResult']['questions']['question'];
                //     wsResult['searchResult']['questions']['question']= [];
                //     wsResult['searchResult']['questions']['question'].push(t);
                // }
                for(let [i,question] of Object.entries(wsResult['searchResult']['questions']['question'])){
                    let ansArray = [];
                    if(question['@answersCount']> 0){
                        // if(question['categories']['category']['@externalId']=== mcatid){
                           
                            if(question['@answersCount'] === '1'){
                                let c=question['answers']['answer'];
                                question['answers']['answer']= [];
                                question['answers']['answer'].push(c);
                            }
                            
                            for(let [j,answer] of Object.entries(question['answers']['answer'])){

                                answer['recency'] = Helper.getRecency(answer['@publicationTime'])
                                let parsedData = Helper.processData(answer['text']);
                                answer['text'] = parsedData['html'];
                                answer['img'] = parsedData['img'];
                                answer['video'] = parsedData['video'];
                                let att = '';
                                if(answer['attachments']){
                                    att = answer['attachments']['attachment'];
                                }
                                answer['media'] = Helper.imgvdoHTML(answer['img'],answer['video'],att,qid);
                                if(answer['text'] !="\r\n"){
                                    ansArray.push(answer);
                                    miniDetailsAPromise.push(Helper.fetchMiniDetail(answer["user"]["@id"],answer["user"]["@username"],req,res));                          
                                    } 
                            }
                            question['answers']['answer']=ansArray;  
                            question['totalcount'] = (wsResult['searchResult'] && wsResult['searchResult']['questions'] && wsResult['searchResult']['questions']['@totalCount']) ? wsResult['searchResult']['questions']['@totalCount'] : '';
                            wsResultFinal.push(question)
                            qid++;
                            miniDetailsQPromise.push(Helper.fetchMiniDetail(question["author"]["@id"],question["author"]["@username"],req,res));           

                        // }
                    
                    }
                }

                Promise.all(miniDetailsQPromise).then(Qdata=>{
                    Promise.all(miniDetailsAPromise).then(Adata=>{
                        let i=0,j=0;
                        let Qarr = [],Aarr;
                        for(const question of wsResultFinal){
                            Aarr = [];
                            for(const answer of question['answers']['answer']){
                                answer["miniDetails"] = Adata[j];
                                Aarr.push(answer);
                                j++;
                            }
                            question["miniDetails"] = Qdata[i];
                            question['answers']['answer'] = Aarr;
                            Qarr.push(question);
                            i++;
                        }
                        wsResultFinal = Qarr;
                        resolve(wsResultFinal)
                    })

                    
                })
           


                
            
            }
            else{
                 resolve(wsResultFinal);
            }
        }

        return new Promise(fData);
            
      
        
    },

    fetchMiniDetail(id,username,req,res){
        return new Promise((resolve,reject)=>{
            if(username.indexOf('indiamart')>-1) resolve({});
            else{
                Helper.getMiniDetails(id,req,res).then(data=>{
                    resolve(data);
                })
                .catch(e=>{
                    resolve({error:e});
                })
            }
            
        })
    },

    getToken(grant_type,username,req,res){
        return new Promise((resolve,reject) => {
            let url = 'https://indiamart.services.answerbase.com/api/v2/token';
            let params = {
                grant_type: grant_type,
                username: username,
                password: "29d833f542994878ad0c774953f3a60f"
            }
            const options = {
                        url : url,
                        method : 'POST',
                        form : params,
                        timeout : 8000
                    }
       
            GblComFunc.makeRequest(req, res, options, false, true)
            .then(response=>{
            let parsed = JSON.parse(response);
             resolve(parsed['access_token']);
            })
            .catch(error=>{
                const statusService = error || 503;
                reject (statusService);
                
            })
        })
    },
    getFaqData(mcatid,req,res,startPoint){
        let getData = ((resolve,reject)=>{
            let wsResultFinal = {};
            //Type 1 Represents error
            wsResultFinal['type']=1;
            if(mcatid){
                let isFaqExists = this.isFaqExists(mcatid);
                if(isFaqExists){
                    let url = 'https://indiamart.answerbase.com/api/getquestionslist.aspx';          
                    let params = {
                        apikey              : '29d833f542994878ad0c774953f3a60f',
                        format              :  'json',
                        categoryExternalIds :  mcatid,
                        fullquestiondetails :  true,
                        orderby             :  'newest',
                        maxresults          :  3,
                        startindex          :  startPoint,
                        withanswers         :  true,
                        includeSubCategories:  false
                    }   
                    url = this.makeUrl(url,params); 
                    // console.log("url:", url)
                    const options = {
                        method: 'GET',
                        url: url,
                        timeout: 30000
                    }  
                    GblComFunc.makeRequest(req, res, options, false, true)
                    .then(response=>{
                          //  let wsResult= JSON.parse(response.body);
                            let wsResult= JSON.parse(response);
                          //  let statusCode = response.statusCode;
                            wsResultFinal['header_status']= 200;
                            wsResultFinal['data']=[];

                          //  if(statusCode === 200){                              
                                Helper.filterData(wsResult,mcatid,req,res).then(data=>{
                                    wsResultFinal['data'] = data;
                                    if(wsResultFinal['data'].length > 0){
                                        //sort left
                                        wsResultFinal['type'] = 0 ;
                                    }
                                    else {
                                        wsResultFinal['data'] = "Questions have no answers";
                                    }
                                    resolve(wsResultFinal);
                                })
                                .catch(e=>{
                                    wsResultFinal['type'] = 1;
                                    wsResultFinal['data'] = "Issue in processing Data";
                                    resolve(wsResultFinal);
                                })
                           // }
                        
                    })
                    .catch(error=>{
                        reject(error)
                    })      
                          
                   
                }
                else{
                    wsResultFinal['header_status']=200;
                    wsResultFinal['data']="FAQ not present for the mcatid";
                    resolve(wsResultFinal);
                
                }
            }
            else{
                wsResultFinal['header_status']=200;
                wsResultFinal['data']="Mcatid not passed";
                resolve(wsResultFinal);
            
            }
        })

        return new Promise(getData);

     
    },
    getUser(userName,req,res){
        let url = 'https://indiamart.answerbase.com/api/getuser.aspx';
        const params = {
            apikey              :  "29d833f542994878ad0c774953f3a60f",
            format              :  'json',
            username            :   userName
        }
        url = Helper.makeUrl(url,params)
        const options = {
            method : 'GET',
            url : url,
            timeout : 13000
        }
        let wsResultFinal = {}
        return new Promise((resolve,reject)=>{
            GblComFunc.makeRequest(req, res, options, false, true)
            .then(response=>{
                wsResultFinal['header_status'] = 200;
                wsResultFinal['data']='User Exist';
                resolve(wsResultFinal);
            })
            .catch(error=>{
                const statusService = error || 503;
                wsResultFinal['header_status'] = statusService;
                wsResultFinal['data'] = [];
                if(statusService && statusService== 400){
                    wsResultFinal['data']='User Doesnot exit';
                }
                else{
                    wsResultFinal['data'] = "Service Unavailable";
                }
                resolve(wsResultFinal);
            })
           
        })
       
        

        
    },
    registerUser(userName,passWord,emailId,req,res){
        const url = 'https://indiamart.answerbase.com/api/registeruser.aspx';
        const params = {
            apikey              :  "29d833f542994878ad0c774953f3a60f",
            format              :  'json',
            username            :   userName,
            password            :   passWord,
            email               :   emailId,
        }
        const options = {
            url : url,
            method : 'POST',
            form : params,
            timeout : 8000
        }
        let wsResultFinal = {}
        return new Promise((resolve,reject)=>{
            GblComFunc.makeRequest(req, res, options, false, true)
            .then(response=>{
                wsResultFinal['header_status'] = 200;
                wsResultFinal['data'] = 'User Registered Sucessfully';
                resolve(wsResultFinal);
            })
            .catch(error=>{
                const statusService = error || 503;
                wsResultFinal['header_status'] = statusService;
                wsResultFinal['data'] = [];
                if(statusService && statusService== 400){
                    wsResultFinal['data'] = 'User Registered Sucessfully';
                }
                else{
                    wsResultFinal['data'] = 'Service Unavailable';
                }
                resolve(wsResultFinal);
            })
           
        })
        
        

    },
    submitFaqAnswer(userName,quesId,text,req,res,token){

        let url = 'https://indiamart.services.answerbase.com/api/v2/answers/add';
        const params = {
            format              :  'json',
            username            :   userName,
            answer              :   text,
            questionId          :   quesId,
            sourceType          :   2
        }
        const options = {
            url : url,
            method : 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'authorization' : `bearer ${token}`
            },
            form : params,
            timeout : 8000
            
        }
        let wsResultFinal = {}
        return new Promise((resolve,reject)=>{
            GblComFunc.makeRequest(req, res, options, false, true)
            .then(response=>{
                wsResultFinal['header_status'] = 200;
                wsResultFinal['data'] = "Response Posted Sucessfully";
                resolve(wsResultFinal);
            })
            .catch(error=>{
                const statusService = error || 503;
                wsResultFinal['header_status'] = statusService;
                wsResultFinal['data'] = [];
                if(statusService && statusService == 302)
                {
                    wsResultFinal['data'] = "Problem in posting the response due to 3xx"
                }
                else if(statusService && statusService== 400){
                    wsResultFinal['data'] = "Problem in posting the response due to 4xx";
                }
                else if(statusService && statusService== 503){
                    wsResultFinal['data'] = "Problem in posting the response due to 5xx";
                }
                else{
                    wsResultFinal['data'] = "Service Unavailable";
                }
                resolve(wsResultFinal);
            })
           
        })
            
        
    },
    submitFaqQuestion(userName,text,mcatId,details,req,res,token){
   
        const url = 'https://indiamart.services.answerbase.com/api/v2/questions/ask';
        
        const params = 
        {
            format              :  'json',
            title               :  text,
            username            :   userName,
            details             :   details,
            type                :   'private',
            sourceType            :   2,
        }
        if(mcatId){
            params["categoryExternalIds"] = mcatId;
        }
        const options = {
            url : url,
            method : 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'authorization' : `bearer ${token}`
            },
            form : params,
            timeout : 8000
            
        }
        let wsResultFinal = {}
        return new Promise((resolve,reject)=>{
            GblComFunc.makeRequest(req, res, options, false, true)
            .then(response=>{
                wsResultFinal['header_status'] = 200;
                wsResultFinal['data'] = "Question Posted Sucessfully";
                resolve(wsResultFinal);
            })
            .catch(error=>{
                const statusService = error || 503;
                wsResultFinal['header_status'] = statusService;
                wsResultFinal['data'] = [];
                if(statusService && statusService == 201)
                {
                    wsResultFinal['data'] = "Question Posted Sucessfully"   
                }
                else if(statusService && statusService == 302)
                {
                    wsResultFinal['data'] = "Problem in posting the question due to 3xx"
                }
                else if(statusService && statusService== 400){
                    wsResultFinal['data'] = "Problem in posting the question due to 4xx";
                }
                else if(statusService && statusService== 503){
                    wsResultFinal['data'] = "Problem in posting the question due to 5xx";
                }
                else{
                    wsResultFinal['data'] = "Service Unavailable";
                }
                resolve(wsResultFinal);
            })
           
        })
            
    },
    postResponse(type = 'QUESTION',userName,text,quesId = '',mcatId = '',details = '',req,res,token){
        //QUESTION : POST question 
        //ANSWER : POST answer
        return new Promise((resolve,reject)=>{
           
           // Check User Exists or not
            Helper.getUser(userName,req,res)
            .then(userDetails =>{
                //User Does not Exists
                if(userDetails['header_status'] === 400 && userDetails['data'] === 'User Doesnot exit'){
                    const passWord = userName;
                    const emailId = userName + '@indiamart.com';
                    //Register User
                    Helper.registerUser(userName,passWord,emailId,req,res)
                    .then(userRegisterDetails =>{
                        //Registration Successfull
                        if(userRegisterDetails['header_status'] ==200 && userRegisterDetails['data']=="User Registered Sucessfully"){
                            //Submit Answer 
                            type === 'ANSWER'?
                            Helper.submitFaqAnswer(userName,quesId,text,req,res,token).then(data =>{ resolve(data)})
                            : Helper.submitFaqQuestion(userName,text,mcatId,details,req,res,token).then(data => resolve(data))
                            
                        }
                        //Registration Fails
                        else{
                            resolve(userRegisterDetails);
                        }
                    })
                }
                //User Exists
                else if(userDetails['header_status'] == 200 && userDetails['data'] =="User Exist"){
                    //Submit Answer
                    type === 'ANSWER'?
                    Helper.submitFaqAnswer(userName,quesId,text,req,res,token).then(data => resolve(data))
                    : Helper.submitFaqQuestion(userName,text,mcatId,details,req,res,token).then(data => resolve(data))
                            
                    
                }
                //User Service Fails
                else {
                    resolve(userDetails);
                }
                
            
            })
            .catch((err)=>{
                reject(err)
            })
           
            
        })
    }
    ,
    setAnswerRecency(data){
        for(let [index,question] of Object.entries(data)){
            question['recency'] = Helper.getRecency(question['@publicationTime']);
        }
        return data;
        
    }
    ,
    getRecency(publishTime){
        let text = '';let label = '';
        if(publishTime){
            publishTime = publishTime.replace(/-/g, ' ');
            let publishDate = new Date(publishTime);
            let currentDate = new Date();
            let diff = (currentDate.getTime() - publishDate.getTime())/(24*3600*1000)
            //Today
            if(diff==0){text='Today';label = 'QA_RECENCY_1';}
            //Yesterday
            else if(diff==1){text='Yesterday';label = 'QA_RECENCY_2'}
            //This week
            else if(diff<7 && diff>1){text='This week';label = 'QA_RECENCY_3'}
            //Last Week
            else if(diff<14 && diff>6){text='Last week';label = 'QA_RECENCY_4'}
            //Recently
            else if(diff<60 && diff>13){text='Recently';label = 'QA_RECENCY_5'}
        

        }

        return {'text':text,'label':label};
    },
    getMiniDetails(userId,req,res){
        return new Promise((resolve,reject)=>{
            const url = serviceUrl.USER_IMUTILS_GET_MINI_DETAILS;
           
            const params = {
                    token  : 'imobile@15061981',
                    modid  : 'IMOB',
                    glusrid : userId
            }
            const options = {
                url : url,
                method : 'POST',
                form : params,
                timeout : 30000
                
            }
            let cbService=serviceUrl.USER_IMUTILS_GET_MINI_DETAILS;
           GblComFunc.makeRequest(req, res, options, false, true,cbService)
           .then(response =>{
                try{
                    let miniDetails = JSON.parse(response);
                    resolve(miniDetails.Response.Data)
                    }
                    catch(e){
                        resolve({})
                    }
           })
           .catch(error=>{
               resolve({})
           })
            
        })
    }
    ,
    imgvdoHTML(imgdata , vdodata, attachmentdata,quesId){
        let id = 0;
        let mediaHTML="";
        try{
        for(const v of imgdata){           
          mediaHTML += `<div name = "faq-imgVdo-${quesId}" data-id = "${id}" class="nsim dib mr20 fImg mt10">${v}</div>`;
          id++;
        }
  
        for(const v of attachmentdata){
            let url = v['@fileurl'].replace('https:/', 'https://')     
            mediaHTML += `<div name ="faq-imgVdo-${quesId}" data-id = "${id}" class="nsim dib mr20 fImg mt10"><img src=${url} alt=${v['@name']}/></div>`;
            id++;
        }
    
        for(const v of vdodata){  
          let vdoImg="";
          const [ getVdoId ,time]=  Helper.getVdoId(v);
          if(getVdoId !="" && getVdoId.search(/iframe/i) <0 ){
            vdoImg=`https://img.youtube.com/vi/${getVdoId}/hqdefault.jpg`;
            mediaHTML += `<div  name = "faq-imgVdo-${quesId}" data-id = "${id}" class="nsim dib mr20 ytB dib por" data-videoId ="${getVdoId}" data-t="${time}"><img class="ht50 mt10" title="" alt="video" src="${vdoImg}"/></div>`;
            id++;
            }
        }
        return mediaHTML;
         }
        catch(e){
            return mediaHTML;
         }
    },
    
    getVdoId(videolink){
        let time ="";
        let vid_ele= [];
        let vid_array = '';
        if(videolink.search(/watch\?/i)>-1){   
            vid_array = videolink.split('?');
            if(vid_array[1]){
                vid_ele= vid_array[1].split('&');
            }
            
            for(const v of vid_ele){
                v= v.split('=');
                if(v[0] && (v[0]=="t" || v[0]=="time_continue" || v[0]=="start")){
                    time=v[1]? v[1] : "" ;
                }
                else if(v[0]=="v"){
                    videolink=v[1]? v[1] : "" ;
                }
            }
        }
        else if(videolink.search(/\/\/youtu.be/i)>-1)
        {    
            vid_array = videolink.split('?');
            if(vid_array[1]){
                vid_ele= vid_array[1].split('&');
            }
            for(const v of vid_ele){
                v= v.split('=');
                if(v[0] && ( v[0]=="t" || v[0]=="time_continue" || v[0]=="start")){
                    time=v[1]? v[1] : "" ;
                }
            }
    
            videolink = vid_array[0].substring(vid_array[0].lastIndexOf('/')+1);

        }
        else{
            if(videolink.search(/embed\//i)>-1){

               videolink = videolink.split('/').reverse()[0].substr(0,11)
            }
        }
    
        return [videolink ,time];
    }
    
}
module.exports = Helper;