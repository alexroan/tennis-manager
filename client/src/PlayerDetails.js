import React, {Component} from 'react';
import {connect} from 'react-redux';

class PlayerDetails extends Component {
    render() {
        return (
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        Player Details
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
	return {

	}
}

export default connect(mapStateToProps)(PlayerDetails);