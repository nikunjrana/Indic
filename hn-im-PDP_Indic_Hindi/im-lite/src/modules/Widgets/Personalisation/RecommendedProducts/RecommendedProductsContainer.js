import { connect } from 'react-redux';
import RPData from './RPData';

const mapStateToProps = (state) => ({
    recommendedData: state.recommendedData,
    CAPsData:state.CAPsData
});

export default connect(mapStateToProps)(RPData);
