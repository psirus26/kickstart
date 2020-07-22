//to connect to a network and unlock an account from that network
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    //account mneumonic to unlock private key to generate public key and address
    'powder festival ocean play alley glass safe arrange speed drive junk other',
    'https://rinkeby.infura.io/v3/e1f253a952fc49948fbf98bc1875c933'
);

const web3 = new Web3(provider);

//deploy created because of async/await that cannot exist outside of a function
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('contract deployed to', result.options.address);
}

deploy();

//deployed to 0x17b8893AA2177673288FC2369b4AE8Ea561ef609
//also deployed to 0x07475b3dceA21c78c236A1b872D00780a4Bd71d6