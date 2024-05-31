import imActionCreators from '../../Login/actions/imActionCreators';
import {connect } from 'react-redux';
import LoginWidget from '../components/LoginWidget';

const mapStateToProps = (state) => ({
  authenticated:state.authenticated,
  isidentified:state.isidentified,
  prevPath:state.prevPath,
  err:state.err,
  ciso:state.ciso,
  pendingOtpMsg:state.pendingOtpMsg,
  isloggedin:state.isloggedin
});


const mapDispatchToProps = (dispatch) => ({

	loginUser: (loginData) => dispatch(imActionCreators.loginUser(loginData)),
	otpVerification : (otpData) => dispatch(imActionCreators.otpVerification(otpData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
