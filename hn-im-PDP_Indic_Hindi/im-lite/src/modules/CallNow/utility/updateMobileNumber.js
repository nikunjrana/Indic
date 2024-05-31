export const mobileNumber = (no,eventLabel) =>{
    if(no && Array.isArray(no)){
        return updateNo(no[0],eventLabel)
    }
    else if(no){
       return updateNo(no,eventLabel)
    }

}

export const updateNo = (no,eventLabel) =>{
    let updatedNo ="";
    let no1 =false;
    if(no.includes("+91")) {
        no1 = true;
    } 
    else if(no.includes(",") && no.slice(0, no.indexOf(",")).length==12){
        no1 = true;
    } 
    no=no.replace(/[+]/g, '');
        if (no.length == 12) {
            updatedNo = no.slice(2, 13);
        } else if (no.indexOf(' ') > -1) {
            updatedNo = no.split(" ")[1];
        } else if(no.indexOf('-')>-1){
            updatedNo = no.split("-")[1];
        }
        else if(no1 && no.includes(",")){
            updatedNo = no.slice(2, no.length);
        }
        else {
            updatedNo = no;
        }
        return updatedNo;
}
