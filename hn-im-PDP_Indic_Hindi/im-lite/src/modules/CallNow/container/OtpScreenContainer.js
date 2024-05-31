import callNowActionCreators from '../actions/callNowActionCreators';
import {connect } from 'react-redux';
import OtpScreen from '../views/OtpScreen';

const mapStateToProps = (state) => ({
  errMsg:state.errMsg,
  pendingOtpMsg:state.pendingOtpMsg,
  alreadySentMsg:state.alreadySentMsg,
  otpSuccess:state.otpSuccess,
  otpGlid:state.glUsrId,
  blockedUser:state.blockedUser,
  mobileNumber:state.mobileNumber,
});


const mapDispatchToProps = (dispatch) => ({
	otpVerification : (otpData) => dispatch(callNowActionCreators.otpVerification(otpData))
});

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);