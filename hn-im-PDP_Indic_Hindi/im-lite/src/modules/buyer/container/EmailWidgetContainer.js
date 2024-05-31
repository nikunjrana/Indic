import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailWidget from '../components/emailWidget';
import imActionSellOnIm from '../../SellOnIm/actions/imActionSellOnIm';

const mapStateToProps = (state) => (
   {
      userdata: state.userdata,
      err: state.err,
      alreadySentMsg: state.alreadySentMsg,
      pendingOtpMsg: state.pendingOtpMsg,
      authenticated:state.authenticated
   }
);
const mapDispatchToProps = (dispatch) => (
   {
      getDetailOfUser: (glid) => dispatch(imActionSellOnIm.getDetailOfUser(glid)),
      otpVerification: (otpData) => dispatch(imActionSellOnIm.otpVerification(otpData))
   }
);
export default connect(mapStateToProps, mapDispatchToProps)(EmailWidget);