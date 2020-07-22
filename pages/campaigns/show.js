import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Contribute from '../../components/Contribute';
import {Link} from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props){
        //address of the campaign from the URL
        const campaign = Campaign(props.query.address);
        const campaignSummary = await campaign.methods.getSummary().call();
        
        return {
            minimumContribution: campaignSummary[0],
            campaignBalance: campaignSummary[1],
            requestsCount: campaignSummary[2],
            approversCount: campaignSummary[3],
            manager: campaignSummary[4],
            campaign: props.query.address
        };
    }

    renderCards() {
        const {
            minimumContribution,
            campaignBalance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header:manager,
                meta: 'Address of Manager',
                description: 'The Manager created this campaign, can create requests to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header:minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'Contribute at least this amount to become an approver'
            },
            {
                header:requestsCount,
                meta: 'Number of requests',
                description: 'A request withdraws money from the contract. Requests must be approved by approvers'
            },
            {
                header:approversCount,
                meta: 'Number of Approvers',
                description: 'Number of donors to the campaign'
            },
            {
                header: web3.utils.fromWei(campaignBalance,'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The amount of money the campaign has left to spend'
            }
        ];

        return <Card.Group items={items}></Card.Group>
    }

    render() {
        return (
            <Layout>
                <h3>{`Campaign Details - ${this.props.campaign}`} </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Contribute campaign={this.props.campaign}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.campaign}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;