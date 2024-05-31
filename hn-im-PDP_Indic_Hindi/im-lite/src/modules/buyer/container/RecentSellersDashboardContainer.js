import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import recentSellersDashboard from '../components/recentSellersDashboard';
import '../css/buyerIndex.css';
import imActionHome from '../../home/actions/imActionHome';

const mapStateToProps = (state) => ({
    messageListing:state.messageListing,
    buyleads:state.buyleads,
    replySentCom:state.replySentCom,
    bubbleLoader:state.bubbleLoader,
    replyText:state.replyText,
    failFlag:state.failFlag,
});


const mapDispatchToProps = (dispatch) => ({
    fetchMessages: (glusrid,start,end,count,chkuser) => {dispatch(imActionCreatorBuyer.fetchMessages(glusrid,start,end,count,chkuser))},
    fetchBuyleads: (len,buyer_response,shortlist,offerid,location,inbox,type,shouldUpdate,blstart,blend,city,iso) => dispatch(imActionCreatorBuyer.fetchBuyleads(len,buyer_response,shortlist,offerid,location,inbox,type,shouldUpdate,blstart,blend,city,iso)),
    blankMessages : () => {dispatch(imActionCreatorBuyer.blankMessages())},
    sendReplyy:(subject,queryId,queryType,msg,sGlid,rGlid,chkuser,section,attach,rfqid,name,mobile,contact_year,code,key,replySentarr,replyText,prevReply,obj,callUpdate) => {dispatch(imActionHome.sendReplyy(subject,queryId,queryType,msg,sGlid,rGlid,chkuser,section,attach,rfqid,name,mobile,contact_year,code,key,replySentarr,replyText,prevReply,obj,callUpdate))},
    
}
)


export default connect(mapStateToProps,mapDispatchToProps)(recentSellersDashboard);


