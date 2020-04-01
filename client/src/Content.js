import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadWeb3 } from './redux/interactions';
import { web3Selector } from './redux/selectors';

class Content extends Component {
    render() {
        const {dispatch, web3} = this.props;

        const connectBlockchain = async (e) => {
            console.log("pushed");
            e.preventDefault();
            await loadWeb3(dispatch);
        }

        return (
            <div className="row justify-content-center">
                <div className="col-4">
                    <form onSubmit={connectBlockchain}>
                        <div className="form-group row">
                            <div className="col-12">
                                <button type="submit" className={`w-100 btn text-truncate ${(web3 !== null) ? "disabled btn-success" : "btn-danger"}`}>
                                    {(web3 !== null) ? "Blockchain Connected" : "Connect Blockchain"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
        web3: web3Selector(state),
	}
}

export default connect(mapStateToProps)(Content);