import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class Campaignnew extends React.Component {

    constructor(props) {
        super(props)
        //this.state = { minimumContribution: ''}
        this.onSubmit = this.onSubmit.bind(this)
      };

    state = {
        minimumContribution: '',
        errorMessage:'',
        loading: false
    };

    async onSubmit (event) {
        //if (event !== null){
        event.preventDefault();
        //}
        //await ethereum.enable();
        console.log('onSubmit : ', this);
        this.setState({ errorMessage: '' });
        this.setState({ loading: true });
        
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            });

            Router.pushRoute('/');
            //value: web3.utils.toWei(this.state.value, 'ether')
        } catch (err) {
            console.log("Error!", err);
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });

    };

    errorMessageDisplay() {
        if(this.state.errorMessage !== '') {
            return (
                
                <div class="ui negative message">
                {/* <i class="close icon"></i> */}
                <div class="header">
                    Oops!
                </div>
                <p>{this.state.errorMessage}
                </p></div>
            )
        }
    }

    render() {
        return( 
            <Layout>
                <h3>Create a Campaign</h3> 

                <form class="ui form" onSubmit={(event) => this.onSubmit(event)}>
                        {/* 
                            <label>Minimum Contribution</label>
                            <input class="ui right labeled input" label="wei"/>
                        </div> */}
                        <div class="field">
                            <div class="ui right labeled input">
                                <input 
                                    placeholder="Amount" 
                                    value={this.state.minimumContribution}
                                    onChange={event => 
                                        this.setState({minimumContribution: event.target.value})}    
                                    />
                                <div class="ui label">
                                    Wei
                                </div>
                            </div>
                        </div>
                        {this.errorMessageDisplay()}
                        
                        <Button loading={this.state.loading} primary>Create</Button>
                    </form>
            </Layout>

        );
    }
}

export default Campaignnew;