import { checkUserLocIso ,  checkUnVerifiedUser , checkCounterValue,checkImeshIso,checkIdentifiedForeignUser} from './loginHelper';
import {checkUserStatus} from '../../../Globals/MainFunctions'; 

export const callNowJourneyTracker = () =>{
    let screenType="";
    let callNowStatus=new Promise((resolve, reject)=>{
        if(checkUserStatus() == 0){ 
            screenType=unIdentifiedUser(); 
        }
        else{
            screenType= identifiedUser();   
        }
        resolve(screenType);
    });
    return callNowStatus;
}

export const unIdentifiedUser = () =>{ 
    //show login screen
    if( checkUserLocIso() == "IN"){ 
        return "indianUser" 
    }
    else{
        return "foreignUser"    
    } 
}

export const identifiedUser = () =>{

    if(checkImeshIso() == "IN" && checkUnVerifiedUser()){
        //show otp screen
        if(checkCounterValue()){ 
            return "skipToBrowse"  
        }
        else{
            return "skipToCall" 
        }
    }
    else if((!checkUnVerifiedUser() || checkIdentifiedForeignUser())){
        return "showDialer"
    }
}


