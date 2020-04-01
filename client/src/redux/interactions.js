import getWeb3 from "../getWeb3";
import {web3Loaded} from "./actions";

export const loadWeb3 = async (dispatch) => {
    const web3 = await getWeb3();
    dispatch(web3Loaded(web3));
    return web3;
}