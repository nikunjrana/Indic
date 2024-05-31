import callNowActionCreators from '../actions/callNowActionCreators';
import {connect } from 'react-redux';
import LoginScreen from '../views/LoginScreen';

const mapStateToProps = (state) => ({
	err:state.err,
	truecallerLogin: state.truecallerLogin,
  	rejLogin: state.rejLogin,
	c2c_ID : state.c2c_ID
});


const mapDispatchToProps = (dispatch) => ({
	loginUser: (loginData) => dispatch(callNowActionCreators.loginUser(loginData)),
	truecallerPolling: (pollingData) => dispatch(callNowActionCreators.truecallerPolling(pollingData)),
	resetGlobalValue: () => dispatch(callNowActionCreators.resetGValue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);