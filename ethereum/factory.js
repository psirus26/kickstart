import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const contractInstance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    //old address: '0x17b8893AA2177673288FC2369b4AE8Ea561ef609');
    //'0x734845532bDbc4210EB62e93f854892eaFF475e2');
    //'0x1C00517C106512dFce5999394d83d89d0cd236Cf');
    '0x7c7A9a3393b2320F9d96a39A21Fc5A8e5619f4aa');

export default contractInstance;