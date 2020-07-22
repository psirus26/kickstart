import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider)

    //const web3 = new Web3(window.web3.currentProvider, undefined, {transactionConfirmationBlocks:1} );
    window.ethereum.enable();
} else {
    //we are on the server or the user is not running metamask
    //connect user to infrura
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/e1f253a952fc49948fbf98bc1875c933'
    );
    web3 = new Web3(provider);
}

export default web3;