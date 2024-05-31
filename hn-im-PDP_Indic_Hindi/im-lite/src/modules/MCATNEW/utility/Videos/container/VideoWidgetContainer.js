import {connect } from 'react-redux';
// import imActionCreatorEnquiryBl from '../../../../EnquiryBlForms/actions/imActionCreatorsEnquiryBl';
import VideoSection from '../components/VideoSection';

const mapStatetoProps = (state) =>({
    mblIsqData: state.mblIsqData
});
const mapDispatchToProps = (dispatch) => ({
    generateIntent : (intentGenData) => dispatch(),
});

export default connect(mapStatetoProps,mapDispatchToProps)(VideoSection);