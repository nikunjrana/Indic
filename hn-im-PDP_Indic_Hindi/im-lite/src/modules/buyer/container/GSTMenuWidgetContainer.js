// import imActionGST from '../../SellOnIm/actions/imActionGST';
import { connect } from 'react-redux';
import GSTMenuWidget from '../components/GSTMenuWidget';


const mapStateToProps = (state) => (
   {
      gstdata: state.gstdata,
      errGst: state.errGst,
      addgstMenu: state.addgst,
      addgstErrMenu: state.addgstErr
   }
);
const mapDispatchToProps = (dispatch) => (
   {
      getGSTIN: (glid) => dispatch(),
      addGST: (gst) => dispatch(),
   }
);
export default connect(mapStateToProps, mapDispatchToProps)(GSTMenuWidget);