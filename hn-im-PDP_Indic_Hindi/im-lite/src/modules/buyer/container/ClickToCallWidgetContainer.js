import React, { Component } from 'react';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import { connect } from 'react-redux';
import ClickToCalls from '../components/clickToCallWidget';


const mapStateToProps = (state) => (
{}
);
const mapDispatchToProps = (dispatch) => (
   {
    addC2Ctrack:(inpdata)=> dispatch(imActionCreatorBuyer.addC2Ctrack(inpdata))
   }
);
export default connect(mapStateToProps, mapDispatchToProps)(ClickToCalls);