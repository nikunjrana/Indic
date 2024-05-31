export function saveCallDuration (mobile, gluserId, PNS,pagetype,reference)  {
  let time=new Date();
  localStorage.setItem("CallTime",time);
  let number = mobile ;
  let receiverGlid = gluserId
  let numtype = PNS;
  let page = pagetype
  let that = reference;
  let visibilityChange;
  let visibilityState;
  if (typeof document.visibilityState !== 'undefined') {
    visibilityChange = 'visibilitychange';
    visibilityState = 'hidden';
  } else if (typeof document.mozHidden !== 'undefined') {
    visibilityChange = 'mozvisibilitychange';
    visibilityState = 'mozVisibilityState';
  }
  document.addEventListener(visibilityChange, newFun)
  function newFun (){
    let lsData = (localStorage.getItem("CallTime"));
    if (lsData) {
      if (!document[visibilityState]) {
        let oldTime = new Date(lsData);
        let t = new Date();
        if((t.getDate()==oldTime.getDate()|| t-oldTime <86400000) && that.props && that.props.c2c_ID){
        var diff = t - oldTime
        if (that.props.isWType && that.props.last_transaction_id) {
          let q_type= 'W';
          that.props.addC2CtrackMsg(number, receiverGlid, numtype,page, that.props.last_transaction_id, q_type,that.props.c2c_ID,diff)
        } else if(that.props.isBType && that.props.last_transaction_refid){
          let q_type= 'B';
          that.props.addC2CtrackMsg(number, receiverGlid, numtype,page, that.props.last_transaction_refid, q_type,that.props.c2c_ID,diff)
        } else if(that.props.ofr_id){
          let q_type= 'W';
          that.props.addC2CtrackMsg(number, receiverGlid, numtype,page, that.props.ofr_id, q_type,that.props.c2c_ID,diff)
        } else {
          that.props.addC2CtrackMsg(number, receiverGlid, numtype,page,'','',that.props.c2c_ID,diff)
        }
        }
        localStorage.removeItem("CallTime");
        document.removeEventListener(visibilityChange, newFun)
      }

    }

  }

}