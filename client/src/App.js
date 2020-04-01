import React, { Component } from "react";
import {connect} from 'react-redux';
import Content from "./Content";
import "./App.css";

class App extends Component {

	render(){
		return (
			<div className="container py-5">
				<Content />
			</div>
		)
	}

}

function mapStateToProps(state){
	return {

	}
}

export default connect(mapStateToProps)(App);