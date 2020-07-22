import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <div className="ui menu" style={{marginTop: '10px'}}>
            <Link route="/">
                <a className="item">CrowdCoin</a>
            </Link>
            <div className="right menu">
                <Link route="/">
                    <a className="item">Campaign</a>
                </Link>
                <Link route="/campaigns/new">
                    <a className="item">
                        <Button
                            icon="add circle"
                            primary
                        >
                        </Button>
                    </a>
                </Link>
            </div>
        </div>
    )
}