import React from 'react';
import {Link} from 'react-router';
import LinearProgress from 'material-ui/lib/linear-progress';

const gallery = [
    "http://igloofest.ca/public/app/uploads/images/569ddee1488dd.jpeg",
    "http://igloofest.ca/public/app/uploads/images/569dded5616f7.jpeg",
    "http://igloofest.ca/public/app/uploads/images/569ddec9e5107.jpeg",
    "http://igloofest.ca/public/app/uploads/images/569ddec2b96e4.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a404a49ddb5.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a404bb244e3.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a404b219d7d.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a404ad503a2.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a2bb7a46b83.jpg",
    "http://igloofest.ca/public/app/uploads/images/56a2bb62bec09.jpg",
    "http://igloofest.ca/public/app/uploads/images/56a6b6d20ec08.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a6b6c35209f.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a6b6b451cc1.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a6b6b003379.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a6b6aa76e1d.jpeg",
    "http://igloofest.ca/public/app/uploads/images/56a6b6a03f659.jpeg",
    "http://igloofest.ca/public/app/uploads/images/569984c384a8d.jpeg",
    "http://igloofest.ca/public/app/uploads/images/569984b43d4b8.jpeg",
    "http://igloofest.ca/public/app/uploads/images/5699848d23183.jpeg",
    "http://igloofest.ca/public/app/uploads/images/569984d1224b3.jpeg"
];

function getImage(url){
    return new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
            resolve(url)
        };
        img.onerror = function(){
            reject(url)
        };
        img.src = url
    })
}

var images = gallery.map(getImage);



var Landing = React.createClass({
    getInitialState(){
      return {
          galleryFetched:false,
          gallery:[]
      }
    },
    componentDidMount(){
        const images = gallery.map(getImage);
        let component = this;
        Promise.all(images).then(function(urls){
            component.setState({
               galleryFetched:true,
               gallery:urls
           });
        }).catch(function(urls){
            console.log("Error fetching some images: " + urls)
        });
    },
    renderGallery(){
        if (this.state.galleryFetched) {
            return (
                this.state.gallery.map((url, index) => (
                    <li key={index} className="gallery_item"><img src={url}/></li>
                ))
            )
        }
    },
    renderProgress(){
        if (!this.state.galleryFetched) {
            return (
                <LinearProgress className="content-section_progress-bar" style={{marginBottom:'10px'}} mode="indeterminate"/>
            )
        }
    },
    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="content-section_ticket">
                        <img className="content-section_igloofestlogo" src="http://igloofest.ca/public/app/uploads/images/5661d13eecfee.png" alt="igloofest logo"/>
                        <Link className="content-section_link" to="/en/departures/dr5reg/f25dvk/2016-02-05">GET YOUR BUS TICKET NOW!</Link>
                    </div>
                    <div className="content-section_busbudlogo">
                        {this.renderProgress()}
                        <img src="https://busbud-pubweb-assets.global.ssl.fastly.net/images/logos/fc7ed21.logo-post-60@2x.png" alt="busbud logo"/>
                    </div>
                </div>
                <ul className="gallery">
                    {
                        this.renderGallery()
                    }
                </ul>
            </div>
        )
    }
});

export default Landing;
