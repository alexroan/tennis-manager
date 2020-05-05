import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Button} from 'react-bootstrap';
import { tennisPlayerSelector, selectedPlayerIdSelector, accountSelector, isEnlistedSelector } from './redux/selectors';
import { enlistToCompete } from './redux/interactions';

const enlistPlayer = (props, e) => {
    e.preventDefault();
    const {dispatch, tennisPlayer, playerId, account} = props;
    enlistToCompete(dispatch, tennisPlayer, playerId, account);
}

class Compete extends Component {

    render() {    
        const {isEnlisted} = this.props;

        if (!isEnlisted) {
            return (
                <Card>
                    <Card.Header>
                        Enlist To Compete
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={(e) => enlistPlayer(this.props, e)}>
                            <Button className="form-control" type="submit">
                                Enlist
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
            )
        }
        else {
            return (
                <>ENLISTED</>
            )
        }
    }
}

function mapStateToProps(state){
	return {
        isEnlisted: isEnlistedSelector(state),
        tennisPlayer: tennisPlayerSelector(state),
        playerId: selectedPlayerIdSelector(state),
        account: accountSelector(state)
	}
}

export default connect(mapStateToProps)(Compete);