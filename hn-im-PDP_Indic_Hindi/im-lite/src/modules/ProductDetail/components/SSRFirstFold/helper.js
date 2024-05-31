 export function TransformContactNumber (contactNo) {
    let updatedNo = mobileNumber(contactNo);
    if(updatedNo){
        updatedNo = updatedNo.indexOf(',') > -1 ? updatedNo.split(',')[0] : updatedNo;
        updatedNo = "+91-" + updatedNo
        return updatedNo;
    }
    return "";
}
function mobileNumber (no) {
    if(no && Array.isArray(no)){
        return updateNo(no[0])
    }
    else if(no){
       return updateNo(no)
    }
}
function updateNo (no) {
    let updatedNo ="";
    let no1 =false;
    if(no.includes("+91")) {
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