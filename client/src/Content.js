import React, {Component} from 'react';
import {connect} from 'react-redux';
import Connections from './Connections';

class Content extends Component {
    render() {

        return (
            <div>
                <Connections />
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
	}
}

export default connect(mapStateToProps)(Content);