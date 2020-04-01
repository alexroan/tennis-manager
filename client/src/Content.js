import React, {Component} from 'react';
import {connect} from 'react-redux';
import Connections from './Connections';
import PlayerList from "./PlayerList";
import PlayerDetails from "./PlayerDetails";

class Content extends Component {
    render() {
        return (
            <div className="container py-2">
                <Connections />
                <div className="row">
                    <PlayerList />
                    <PlayerDetails />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
	}
}

export default connect(mapStateToProps)(Content);