import {connect } from 'react-redux';
// import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
// import EnquiryBlAction from "../../EnquiryBlForms/actions/imActionCreatorsEnquiryBl";
import InlineEnquiry from '../components/inlineEnquiry';


const mapStateToProps = (state) => ({
// popupIsqData: state.isqData,
mblIsqData: state.mblIsqData
});


const mapDispatchToProps = (dispatch) => ({
	mblGetISQ: (getISQData) => dispatch()
	// hitGetISQ: (data) => dispatch(imActionCreatorBuyer.hitGetISQ(data))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(InlineEnquiry);
