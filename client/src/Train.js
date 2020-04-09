import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import { selectTrainableAttribute } from './redux/interactions';
import { selectedPlayerDetailsSelector, selectedTrainableAttributeNameSelector } from './redux/selectors';

const attributeSelected = (props, name, id) => {
    selectTrainableAttribute(props.dispatch, name, id);
}

class Train extends Component {

    render() {
        let isDisabled = this.props.playerDetails === false;
        return (
            <div className="card">
                <div className="card-header">
                    Trainer
                </div>
                <div className="card-body">
                    <Dropdown>
                        <Dropdown.Toggle disabled={isDisabled} size="sm">
                            {this.props.selectedTrainableAttributeName == null ? "Attribute" : this.props.selectedTrainableAttributeName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item key={0} onClick={(e) => attributeSelected(this.props, "Agility", 0)} >Agility</Dropdown.Item>
                            <Dropdown.Item key={1} onClick={(e) => attributeSelected(this.props, "Power", 1)} >Power</Dropdown.Item>
                            <Dropdown.Item key={2} onClick={(e) => attributeSelected(this.props, "Stamina", 2)} >Stamina</Dropdown.Item>
                            <Dropdown.Item key={3} onClick={(e) => attributeSelected(this.props, "Technique", 3)} >Technique</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
        playerDetails: selectedPlayerDetailsSelector(state),
        selectedTrainableAttributeName: selectedTrainableAttributeNameSelector(state)
	}
}

export default connect(mapStateToProps)(Train);