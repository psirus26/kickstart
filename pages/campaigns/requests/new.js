import React , { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    static async getInitialProps(props){
        const { address } = props.query;

        return { address };
    }

    state = {
        description:'',
        value:'',
        recipient:'',
        errorMessage:'',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault(); 
        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage:'' });
        const { description, value, recipient } = this.state;
        
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                //web3.utils.toWei(this.state.value,'ether'),
                this.state.value,
                recipient
            ).send({
                from: accounts[0]
            });

            Router.pushRoute(`/campaigns/${this.props.address}`);
            //value: web3.utils.toWei(this.state.value, 'ether')
        } catch (err) {
            console.log("Error!", err);
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false, value:'' });
    };

    render(){
        return (
            <Layout>
                
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                            label="ether"
                            labelPosition="right"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({recipient: event.target.value})}
                        />
                    </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage}></Message>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button secondary>Back</Button>
                            </a>
                        </Link>
                        <Button primary loading={this.state.loading}>
                            Create
                        </Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;