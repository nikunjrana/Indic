import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import dashboard  from '../components/dashboard';
import imActionCreatorBuylead from '../../Buylead/action/imActionCreatorBuylead';
import imActionCreators from '../../Enquiries/actions/imActionCreators';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
    get_latestenqbls: state.get_latestenqbls,
    get_invoicebanner: state.get_invoicebanner,
    searches_loading : state.searches_loading,
    buyleads : state.buyleads,
    enquiries:state.enquiries,
    get_dashboard_data : state.get_dashboard_data
});


const mapDispatchToProps = (dispatch) => ({
    getUserEnqAndBl: (modid, glid, mobile, email,ccode) => dispatch(imActionCreatorBuyer.getUserEnqAndBl(modid, glid, mobile, email,ccode)),
    getDisplayInvoiceBanner: (glid) =>  dispatch(imActionCreatorBuyer.getDisplayInvoiceBanner(glid)),
    fetchBuyleads: (len,buyer_response,shortlist,offerid,location,inbox,type,shouldUpdate,blstart,blend,city,iso) => dispatch(imActionCreatorBuylead.fetchBuyleads(len,buyer_response,shortlist,offerid,location,inbox,type,shouldUpdate,blstart,blend,city,iso)),
    fetchEnquiries: (start,end,enqType,folderValue,pageType) => dispatch(imActionCreators.fetchEnquiries(start,end,enqType,folderValue,pageType)),
 
}
)



export default connect(mapStateToProps,mapDispatchToProps)(dashboard);