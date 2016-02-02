import React from 'react';
import {Link} from 'react-router';

const gallery = [
    {
        img:"http://igloofest.ca/public/app/uploads/images/569ddee1488dd.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/569dded5616f7.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/569ddec9e5107.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/569ddec2b96e4.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a404a49ddb5.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a404bb244e3.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a404b219d7d.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a404ad503a2.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a2bb7a46b83.jpg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a2bb62bec09.jpg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a6b6d20ec08.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a6b6c35209f.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a6b6b451cc1.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a6b6b003379.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a6b6aa76e1d.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/56a6b6a03f659.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/569984c384a8d.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/569984b43d4b8.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/5699848d23183.jpeg"
    },
    {
        img:"http://igloofest.ca/public/app/uploads/images/569984d1224b3.jpeg"
    }
];

var Landing = React.createClass({
    render() {
        return (
            <div>
                <div className="home-section">
                    <div className="home-section_ticket">
                        <img className="home-section_igloofestlogo" src="http://igloofest.ca/public/app/uploads/images/5661d13eecfee.png" alt="igloofest logo"/>
                        <Link className="home-section_link" to="/en/departures/dr5reg/f25dvk/2016-02-05">GET YOUR BUS TICKET NOW!</Link>
                    </div>
                    <div className="home-section_busbudlogo"><img src="https://busbud-pubweb-assets.global.ssl.fastly.net/images/logos/fc7ed21.logo-post-60@2x.png" alt="busbud logo"/></div>
                </div>
                <ul className="gallery">
                    {gallery.map((tile,index) => (
                        <li key={index} className="gallery_item"><img src={tile.img} /></li>
                    ))}
                </ul>
            </div>
        )
    }
});

export default Landing;
