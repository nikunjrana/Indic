import React, { Component } from 'react';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import imActionSellOnIm from '../../SellOnIm/actions/imActionSellOnIm';
import { connect } from 'react-redux';
import GSTWidget from '../components/GSTWidget';


const mapStateToProps = (state) => (
   {
      gstdata: state.gstdata,
      errGst: state.errGst,
      addgst: state.addgst,
      addgstErr: state.addgstErr,
      gstDispositionRead: state.gstDispositionRead,
      gstDispositionErr: state.gstDispositionErr,
      gstDispUpdate: state.gstDispUpdate,
      gstDispUpdateErr: state.gstDispUpdateErr,
      soiDispositonList:state.soiDispositonList
   }
);
const mapDispatchToProps = (dispatch) => (
   {
      getGSTIN: (glid) => dispatch(imActionSellOnIm.getGSTIN(glid)),
      addGST: (gst) => dispatch(imActionSellOnIm.addGST(gst)),
      addGSTDispositions: (gstDispositionData) => dispatch(imActionSellOnIm.addGSTDispositions(gstDispositionData)),
      getGSTDispositions: () => dispatch(imActionSellOnIm.getGSTDispositions()),
      getGSTDispositionsList: () => dispatch(imActionSellOnIm.getGSTDispositionsList())
   }
);
export default connect(mapStateToProps, mapDispatchToProps)(GSTWidget);