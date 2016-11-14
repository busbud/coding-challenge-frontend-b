import React from 'react';
import {Link} from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1 col-sm-offset-1" id="pageName">
                                Callumbud
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="app-content">{this.props.children}</div>
                </div>
                <footer></footer>
            </div>
        );
    }
}
