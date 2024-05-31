import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import cityRecommendedMcats from '../components/cityRecommendedMcats';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
    service_response: state.service_response
});


const mapDispatchToProps = (dispatch) => ({
    getcitymcats: (glid,count) => dispatch(imActionCreatorBuyer.getcitymcats(glid,count))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(cityRecommendedMcats);


