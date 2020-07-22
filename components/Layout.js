import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

class Layout extends Component{
    //(props) => {
    render(){
        return (
            <div>
            <Container>
                <Head>
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                </Head>
                <Header />
                {this.props.children}
            </Container>
            </div>
        )
    }
}

export default Layout;