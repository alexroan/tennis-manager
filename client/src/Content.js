import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import Connections from './Connections';
import PlayerList from "./PlayerList";
import PlayerDetails from "./PlayerDetails";
import PlayerAttributes from './PlayerAttributes';
import Train from './Train';
import Compete from './Compete';

class Content extends Component {
    render() {
        return (
            <Container>
                <Connections />
                <Row>
                    <Col md="3">
                        <PlayerList />
                    </Col>
                    <Col md="9">
                        <Tabs>
                            <Tab eventKey="details" title="Details">
                                <Row>
                                    <Col md="6">
                                        <PlayerDetails />
                                    </Col>
                                    <Col md="6">
                                        <PlayerAttributes />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="training" title="Training">
                                <Train />
                            </Tab>
                            <Tab eventKey="compete" title="Compete">
                                <Compete />
                            </Tab>
                            <Tab eventKey="results" title="Results">
                                Results Tab
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state){
	return {
	}
}

export default connect(mapStateToProps)(Content);