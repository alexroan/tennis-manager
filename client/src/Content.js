import React, {Component} from 'react';
import {connect} from 'react-redux';
import Connections from './Connections';
import PlayerList from "./PlayerList";
import PlayerDetails from "./PlayerDetails";
import PlayerAttributes from './PlayerAttributes';
import Train from './Train';

class Content extends Component {
    render() {
        return (
            <div className="container py-2">
                <Connections />
                <div className="row">
                    <PlayerList />
                    <div className="col-4">
                        <PlayerDetails />
                        <PlayerAttributes />
                    </div>
                    <div className="col-4">
                        <Train />
                    </div>
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