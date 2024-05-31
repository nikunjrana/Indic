import React, { PureComponent } from 'react';
import McatFilter from '../../MCATNEW/McatFilter';

class FirstFoldMcat extends PureComponent {
    constructor(props){
        super(props);
        // console.log(props.serviceData, "props")
    }
 
    render() {
      
        return (
          <>
            <McatFilter cityId={this.props.serviceData.cityId} mcatName={this.props.serviceData.mcatName} mcatFlName={this.props.serviceData.mcatFlname} citiesData={this.props.serviceData.cityBarList} catData={this.props.serviceData.mcatdataList} brandsdata={''} bizData={''} path={''} allIndiaLINK={"भारत"} isqText={''} isqData={''} isqHead={''} cityNameSelected={this.props.serviceData.cityName} isFirefox={''}/>
          </>
        )
    }
}

export default FirstFoldMcat;