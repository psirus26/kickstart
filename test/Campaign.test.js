const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts; //list of eth accounts
let factory; //reference to deployed factory
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign(web3.utils.toWei('100',"wei")).send({
        from: accounts[0],
        gas: '1000000'
    });

    const addresses = await factory.methods.getDeeployedCampaigns().call();
    campaignAddress = addresses[0];

    //no need to deploy, just call the address of the campaign!
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface),campaignAddress)


    //campaign = await new web3.eth.Contract(JSON.parse)
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller (person) as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    });

    it('receives contributions and marks contributers as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        const approver = await campaign.methods.approvers(accounts[1]).call();

        //assert.equal(approver, true);
        //same as below
        assert(approver);
    });

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '50',
                from: accounts[1]
            });
            assert(false);
        }
        catch(err){
            assert(err);
        }

    });

    it('allows a manager to make a payment request', async () => {
        await campaign.methods.createRequest(
            'Buy batteries',
            '100',
            accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await campaign.methods.requests(0).call();

        assert(request);
        assert.equal('Buy batteries',request.description);

    });

    it('processes requests', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10','ether')
        });

        await campaign.methods.createRequest(
            'Buy batteries',
            web3.utils.toWei('5','ether'),
            accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas:'1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas:'1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);

        console.log('balance', balance);

        assert(balance > 104);

    });

    // it('', () => {

    // });
});