import React, { Component } from 'react';
import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import CallNow from '../components/callNowWidget';

const mapStateToProps = (state) => ({
  addC2Ctrack:state.addC2Ctrack,
  authenticated:state.authenticated,
  isidentified:state.isidentified,
  callver : state.callver,
  trackresponse : state.trackresponse
});

const mapDispatchToProps = (dispatch) => ({
  addC2Ctrack:(inpdata)=> dispatch(imActionCreatorBuyer.addC2Ctrack(inpdata)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallNow);