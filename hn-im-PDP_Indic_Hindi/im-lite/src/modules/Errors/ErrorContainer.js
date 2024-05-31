import React from 'react';
import { connect } from 'react-redux';
import View from './View'

const mapStateToProps = (state) => ({
    pageError: state.pageError
})
const mapDispatchToProps = (dispatch) => ({
    resetErrorState: () => { dispatch({ type: 'SET_PAGE_ERROR', payload: { pageError: '' } }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(View)