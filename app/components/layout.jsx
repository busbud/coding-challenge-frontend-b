import React from 'react';
import {Link} from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1 col-md-offset-1" id="pageName">
                                Callumbud
                            </div>
                        </div>
                    </div>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer></footer>
            </div>
        );
    }
}
