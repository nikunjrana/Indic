import imActionCreators from '../../Login/actions/imActionCreators';
import {connect } from 'react-redux';
import WelcomeMailerVerification from '../components/WelcomeMailerVerification';

const mapStateToProps = (state) => ({
  otpsent:state.otpsent,
  authenticated:state.authenticated,
  err:state.err,
  ciso:state.ciso,
  pendingOtpMsg:state.pendingOtpMsg,
  userloggedin:state.userloggedin
});

const mapDispatchToProps = (dispatch) => ({
	otpVerification : (otpData) => dispatch(imActionCreators.otpVerification(otpData))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeMailerVerification);
