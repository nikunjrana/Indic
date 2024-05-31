import { connect } from 'react-redux';
import FCData from './FCData';

const mapStateToProps = (state) => ({
    recommendedMcat: state.recommendedMcat
});

export default connect(mapStateToProps)(FCData);


