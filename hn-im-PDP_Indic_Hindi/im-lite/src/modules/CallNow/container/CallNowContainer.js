import {connect } from 'react-redux';
import  CallNowController from '../views/CallNowController';
import {callNowActionDispatcher} from '../actions/callNowActionDispatcher';
import callNowActionCreators from '../actions/callNowActionCreators';

const mapStateToProps = (state) => ({
    displayCallNow:state.displayCallNow,
    callProps:state.callProps,
    blockedUser:state.blockedUser,
    existing: state.existing,
    c2c_ID : state.c2c_ID,
    CWILogin:state.CWILogin,
    authenticated: state.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    closeCallNowPopup : () => callNowActionDispatcher(false),
    CWIAction: (action) => dispatch(callNowActionCreators.CWIAction(action)),
    getToken: (data) => dispatch(callNowActionCreators.getToken(data)),
    getFullLoginData: (data) => dispatch(callNowActionCreators.getFullLoginData(data)),
    loginWithGoogle_First: (loginData) => dispatch(callNowActionCreators.loginWithGoogle_First(loginData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CallNowController);