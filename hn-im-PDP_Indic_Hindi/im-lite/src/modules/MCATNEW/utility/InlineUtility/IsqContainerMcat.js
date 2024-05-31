import {connect } from 'react-redux';
import InlineBl from '../InlineBl';
const mapStateToProps = (state) => ({
mblIsqData: state.mblIsqData
});

export default connect(mapStateToProps)(InlineBl);