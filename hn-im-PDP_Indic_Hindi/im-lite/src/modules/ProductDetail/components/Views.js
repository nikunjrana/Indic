import React from 'react'
import SSRFirstFold from './SSRFirstFold/SSRFirstFold';
export default class Views extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Error404: '', Error5xx: '' }
        this.get404View = this.get404View.bind(this);
        this.get5XXView = this.get5XXView.bind(this);
    }

    get404View() {
        if (!this.state.Error404) {
            import(/* webpackChunkName:"Error404" */ "../../../Globals/Error404/error404").then((module) => {
                this.setState({ Error404: module.default })
            });
            return ''
        }
        else {
            let view =
                <>

                    <this.state.Error404 />
                </>
            return view;
        }
    }
    get5XXView() {
        if (!this.state.Error5xx) {
            import(/* webpackChunkName:"Error5xx" */ "../utility/Error5XX/Error5XX").then((module) => {
                this.setState({ Error5xx: module.default })
            });
            return ''
        }
        else {
            let view = <this.state.Error5xx />
            return view;
        }
    }


    getPDPView() {
        let view = <>
            <div id="pdpFirstFold" className='promptHandlingClass por'><SSRFirstFold data={window._PDP_STORE.pdpData} IsSSR={false} />
            </div>


        </>
        return view;
    }

    constructView() {
        let page = '';
        if (this.props.pdp404) {
            page = this.get404View();
        }
        else if (this.props.pdp5XX) {
            page = this.get5XXView();
        }
        else if (this.props.firstViewData) {
            page = this.getPDPView();
        }
        return page
    }

    render() {
        let pageView = this.constructView();
        return (
            <>
                {pageView}


            </>
        )
    }
}
