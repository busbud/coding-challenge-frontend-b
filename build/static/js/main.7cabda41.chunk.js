(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{315:function(e,t,r){},5605:function(e,t,r){e.exports=r(5947)},5610:function(e,t,r){},5947:function(e,t,r){"use strict";r.r(t);var a={};r.r(a),r.d(a,"PERFORM_SEARCH",function(){return D}),r.d(a,"DISPATCH_RESULT",function(){return k}),r.d(a,"DISPATCH_PARTIAL_RESULT",function(){return A});var n={};r.r(n),r.d(n,"initSearch",function(){return N}),r.d(n,"onSearchStarted",function(){return _}),r.d(n,"onSearchSucceed",function(){return R}),r.d(n,"dispatchResult",function(){return P}),r.d(n,"dispatchPartialResult",function(){return L});var o=r(0),s=r.n(o),l=r(27),i=r.n(l),c=(r(5610),r(131)),u=r(315),d=r.n(u),p=r(316),m=r(52),h=r(132),v=r(39),f=r.n(v),b=r(29),g=r(30),E=r(19);r(5621).polyfill();var j=function(e,t){return function(e,t,r){return new Promise(function(a,n){var o=new Headers;if(o.append("Accept","application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"),o.append("X-Busbud-Token","PARTNER_AHm3M6clSAOoyJg4KyCg7w"),o.append("Accept-Language",r),t)for(var s in t.headers)o.set(s,t.headers[s]);var l=Object(g.a)({method:"get"},t,{headers:o});return t&&null!==t.json&&void 0!==t.json&&Object.assign(l,{body:JSON.stringify(t.json)}),fetch(e,l).then(function(e){var t=e.headers.get("content-type");return 200===e.status||201===e.status?e.json().then(function(e){a(e)}):t&&t.includes("application/json")?e.json(function(e){return n(e)}):n(new Error(e.status.text))})})}(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"en-en")},O=r(135),C=r.n(O),T="https://napi.busbud.com/x-departures",y=function(e){var t=e.adultCount,r=e.childCount,a=e.seniorCount,n=e.originGeohash,o=e.arrivalGeohash,s=e.outboundDate,l=e.polling,i="".concat(T,"/").concat(n,"/").concat(o,"/").concat(s,":poll?adult=").concat(t,"&child=").concat(r,"&senior=").concat(a,"&lang=en-en&currency=USD");return l?i.replace(":poll","/poll"):i.replace(":poll","")},S=function(e){var t=C()("cities",e),r=C()("locations",e);return{operators:C()("operators",e).map(function(e){return{id:e.id,logo_url:e.logo_url,display_name:e.display_name}}),cities:t.map(function(e){return{id:e.id,name:e.name,full_name:e.full_name}}),locations:r.map(function(e){return{id:e.id,name:e.name,city_id:e.city_id,address:e.address}})}},w=function(e){var t=e.operators,r=e.locations,a=e.departures,n=e.travellersCount;return a.map(function(e){var a,o,s=e.departure_time,l=e.arrival_time,i=e.prices,c=e.origin_location_id,u=e.operator_id,d=r.find(function(e){return e.id===c}),p=t.find(function(e){return e.id===u});return{arrivalTime:l,departureTime:s,totalPrice:i.total,departureLocation:(a=d.name,o=d.address,"".concat(a,", ").concat(o.join(", "))),travellersCount:n,operator:{name:p.display_name,logoUrl:p.logo_url}}})},x=r(5950),I=r(317),D=Object(I.createRequest)("PERFORM_SEARCH"),k="DISPATCH_RESULT",A="DISPATCH_PARTIAL_RESULT",N=Object(x.a)(D.BASE),_=Object(x.a)(D.STARTED),R=Object(x.a)(D.SUCCEEDED),P=Object(x.a)(k),L=Object(x.a)(A),B=f.a.mark(G),H=f.a.mark(F),U=f.a.mark(J);function G(e){var t,r,a,n,o,s;return f.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return t=e.payload,r=y(t),a=y(Object(g.a)({},t,{polling:!0})),l.next=5,Object(b.put)(_(t));case 5:return l.next=7,Object(b.call)(j,r,{method:"GET"});case 7:return n=l.sent,o=Object(E.get)("complete",n),s=Object(E.getOr)(0,"departures.length",n),l.next=12,Object(b.put)(P(n));case 12:if(o){l.next=24;break}return l.next=15,Object(b.call)(h.b,3e3);case 15:return l.next=17,Object(b.call)(j,"".concat(a,"&index=").concat(s),{method:"GET"});case 17:return n=l.sent,o=Object(E.get)("complete",n),s+=Object(E.getOr)(0,"departures.length",n),l.next=22,Object(b.put)(L(n));case 22:l.next=12;break;case 24:return l.next=26,Object(b.put)(R());case 26:case"end":return l.stop()}},B,this)}function F(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.takeLatest)(a.PERFORM_SEARCH.BASE,G);case 2:case"end":return e.stop()}},H,this)}function J(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.all)([F()]);case 2:case"end":return e.stop()}},U,this)}var M=r(53),W=r.n(M),Y={travelInformations:{cities:[],locations:[],operators:[]},searchInformations:{adultCount:0,childCount:0,seniorCount:0,originGeohash:"",arrivalGeohash:"",outboundDate:"",travellersCount:0},proposedTrips:[],isLoading:!1},$=f.a.mark(q);function q(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.all)([J()]);case 2:case"end":return e.stop()}},$,this)}var z=Object(m.combineReducers)({search:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.STARTED:return function(e,t){return Object(g.a)({},e,{searchInformations:t,isLoading:!0})}(e,t.payload);case D.SUCCEEDED:return function(e){return Object(g.a)({},e,{isLoading:!1})}(e);case k:return function(e,t){var r=e.searchInformations,a=Object(g.a)({},t,{travellersCount:r.travellersCount}),n=w(a),o=Object(E.sortBy)(function(e){return W()(e.departureTime)},n).reverse();return Object(g.a)({},e,{travelInformations:S(t),proposedTrips:o})}(e,t.payload);case A:return function(e,t){var r=e.proposedTrips,a=e.travelInformations,n=e.searchInformations,o=Object(g.a)({},t,{travellersCount:n.travellersCount}),s=w(Object(g.a)({},o,{locations:a.locations})),l=Object(E.sortBy)(function(e){return W()(e.departureTime)},r.concat(s)).reverse();return Object(g.a)({},e,{proposedTrips:l})}(e,t.payload);default:return e}}});var K=r(126),X=r(127),Q=r(133),V=r(128),Z=r(134),ee=r(46),te=r(25),re=r(26),ae=r(318),ne=r.n(ae),oe=Object(te.withStyles)({})(function(e){var t=e.suggestions,r=e.label,a=e.onChange,n=e.isErrored;return s.a.createElement(ne.a,{items:t,getInputProps:function(){return{label:r,error:n}},onChange:a})}),se=r(124),le=r.n(se),ie=function(e){var t=e.onChange,r=e.label,a=e.isErrored;return s.a.createElement(re.g,{onChange:function(e){return t(e.target.value)},label:r,fullWidth:!0,error:a,type:"date",variant:"outlined",InputProps:{shrink:1,startAdornment:s.a.createElement(re.f,{position:"start"},s.a.createElement(le.a,null))}})},ce=r(322),ue=r.n(ce),de=Object(te.withStyles)({proposedTrip:{marginBottom:"16px"},media:{width:"120px",height:"120px",marginBottom:"9px"},tripInformations:{display:"flex",justifyContent:"space-between",borderBottom:"1px solid",paddingBottom:"6px"},timeInformations:{display:"flex"},travellersCount:{fontSize:12},tripComplementatryInformations:{marginTop:"6px"}})(function(e){var t=e.classes,r=e.arrivalTime,a=e.departureTime,n=e.totalPrice,o=e.operator,l=e.departureLocation,i=e.travellersCount;return s.a.createElement(re.b,{className:t.proposedTrip},s.a.createElement(re.c,null,s.a.createElement(re.d,{className:t.media,image:o.logoUrl,title:"Paella dish"}),s.a.createElement("div",{className:t.tripInformations},s.a.createElement("div",{className:t.timeInformations},s.a.createElement(re.h,null,W()(r).format("LT")),"->",s.a.createElement(re.h,null,W()(a).format("LT"))),s.a.createElement("div",{className:t.costInformations},s.a.createElement(re.h,{variant:"subtitle1"},ue()(n).format("$0.00")),s.a.createElement(re.h,{className:t.travellersCount,color:"textSecondary"},"For ".concat(i," traveller(s)")))),s.a.createElement("div",{className:t.tripComplementatryInformations},s.a.createElement(re.h,null,s.a.createElement("span",null,"From: "),l))))}),pe=Object(te.withStyles)({proposedTrips:{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}})(function(e){var t=e.proposedTrips,r=e.classes;return s.a.createElement("div",{className:r.proposedTrips}," ",0===t.length?s.a.createElement(re.h,{variant:"subheading"},"No result found "):t.map(function(e){return s.a.createElement(de,Object.assign({key:"".concat(e.arrivalTime,"/").concat(e.departureTime)},e))}))}),me=r(74),he=r.n(me),ve=r(73),fe=r.n(ve),be=r(123),ge=r.n(be),Ee=r(211),je=function(e,t){var r=t;return 0===r&&"-"===e?r:("+"===e?r+=1:r-=1,r)},Oe=function(e){function t(e){var r;return Object(K.a)(this,t),(r=Object(Q.a)(this,Object(V.a)(t).call(this,e))).handleIncrementTravellerCount=function(e){var t=r.state.travellersCount,a=r.props,n=a.onChange,o=a.travellerType,s=je(e,t);r.setState({travellersCount:s}),n({travellersCount:s,travellerType:o})},r.state={travellersCount:0},r}return Object(Z.a)(t,e),Object(X.a)(t,[{key:"render",value:function(){var e=this,t=this.state.travellersCount,r=this.props,a=r.classes,n=r.travellerType,o=r.isErrored;return s.a.createElement(ge.a,{variant:"outlined",error:o,fullWidth:!0,value:t,type:"number",InputProps:{shrink:1,className:a.input,startAdornment:s.a.createElement(fe.a,{position:"end"},s.a.createElement(he.a,{"aria-label":"Increase traveller Count",onClick:function(){return e.handleIncrementTravellerCount("+")}},s.a.createElement(Ee.a,null))),endAdornment:s.a.createElement(fe.a,{position:"end"},n,s.a.createElement(he.a,{"aria-label":"deacrese traveller Count",onClick:function(){return e.handleIncrementTravellerCount("-")}},s.a.createElement(Ee.b,null)))}})}}]),t}(s.a.Component),Ce=Object(te.withStyles)({input:{textAlign:"center"}})(Oe),Te=[{label:"New York",value:"New York",geohash:"dr5reg"}],ye=[{label:"Montr\xe9al",value:"Montr\xe9al",geohash:"f25dvk"}],Se=function(e){function t(e){var r;return Object(K.a)(this,t),(r=Object(Q.a)(this,Object(V.a)(t).call(this,e))).hasErrors=function(e){return Object(E.values)(e).some(function(e){return!0===e})},r.handleTravelerCountChange=function(e){var t=e.travellersCount,a=e.travellerType,n=r.state.errors,o=Object(E.set)("travellerSelectorErrored",!1,n),s=r.state.searchInfos,l=Object(E.set)("travellers[".concat(a,"]"),t,s);r.setState({isPristine:!1,searchInfos:l,errors:o})},r.handleLocationChange=function(e){var t=e.value,a=e.type,n=e.geohash,o=e.label,s=r.state.errors,l=Object(E.set)("locationSelectorError",!1,s),i=r.state.searchInfos,c=Object(E.set)("locations[".concat(a,"]"),{value:t,geohash:n,label:o},i);r.setState({searchInfos:c,isPristine:!1,errors:l})},r.handleDepartureDateChange=function(e){var t=r.state.searchInfos,a=r.state.errors,n=Object(E.set)("departureDateError",!1,a),o=Object(E.set)("departureDate",e,t);r.setState({isPristine:!1,searchInfos:o,errors:n})},r.handleOnSearch=function(){var e=Object(E.get)("searchInfos",r.state),t=e.travellers,a=e.locations,n=e.departureDate,o=Object(E.get)("errors",r.state),s=r.props.onSearch,l=o,i=t.adult,c=t.senior;if(0===i&&0===c&&(l=Object(E.set)("travellerSelectorErrored",!0,l)),a.departure&&a.arrival||(l=Object(E.set)("locationSelectorError",!0,l)),n&&W()(n).isSameOrAfter(new Date)||(l=Object(E.set)("departureDateError",!0,l)),r.hasErrors(l))r.setState({errors:l,isErrored:!0});else{var u=t.adult,d=t.child,p=t.senior,m=a.departure,h=a.arrival;s({adultCount:u,childCount:d,seniorCount:p,originGeohash:m.geohash,arrivalGeohash:h.geohash,outboundDate:n,travellersCount:u+p+d})}r.setState({searchInfos:{travellers:t,locations:a,departureDate:n}})},r.state={searchInfos:{travellers:{child:0,adult:0,senior:0},locations:{arrival:null,departure:null},departureDate:null},errors:{travellerSelectorErrored:!1,departureDateError:!1,locationSelectorError:!1},isErrored:!1,isPristine:!0},r}return Object(Z.a)(t,e),Object(X.a)(t,[{key:"render",value:function(){var e=this,t=this.props,r=t.classes,a=t.proposedTrips,n=t.isLoading,o=Object(E.get)("errors",this.state),l=o.travellerSelectorErrored,i=o.departureDateError,c=o.locationSelectorError,u=this.state,d=u.errors,p=u.isPristine;return s.a.createElement("div",{className:r.search},s.a.createElement("div",{className:r.searchForm},s.a.createElement("div",{className:r.yourJouney},s.a.createElement(re.h,{className:r.sectionTitle,variant:"h6"},"Your Journey"),s.a.createElement(oe,{isErrored:c,onChange:function(t){return e.handleLocationChange(Object(g.a)({},t,{type:"departure"}))},suggestions:Te,label:"Departure"}),s.a.createElement(oe,{isErrored:c,suggestions:ye,label:"Arrival",onChange:function(t){return e.handleLocationChange(Object(g.a)({},t,{type:"arrival"}))}})),s.a.createElement("div",{className:r.travellingDates},s.a.createElement(re.h,{className:r.sectionTitle,variant:"h6"},"Travelling Date"),s.a.createElement(ie,{isErrored:i,onChange:this.handleDepartureDateChange,label:"Departure Time"})),s.a.createElement("div",{className:r.travellersInformations},s.a.createElement(re.h,{className:r.sectionTitle,variant:"h6"},"Travellers"),s.a.createElement(Ce,{isErrored:l,travellerType:"adult",onChange:this.handleTravelerCountChange}))),s.a.createElement(re.a,{disabled:this.hasErrors(d)||p,onClick:this.handleOnSearch,variant:"contained",color:"secondary",className:r.button},"Search"),n?s.a.createElement("div",{className:r.loader}," ",s.a.createElement(re.e,null)," "):null,!p&&a.length>0?s.a.createElement("div",{className:r.proposedTrips},s.a.createElement(pe,{proposedTrips:a})):null)}}]),t}(o.Component),we=Object(te.withStyles)(function(e){var t;return{search:{padding:"30px"},searchForm:Object(ee.a)({margin:"1.5rem"},e.breakpoints.up("lg"),{display:"flex"}),button:Object(ee.a)({marginTop:"16px"},e.breakpoints.up("xs"),{width:"100%"}),yourJouney:(t={},Object(ee.a)(t,e.breakpoints.up("lg"),{width:"40%"}),Object(ee.a)(t,"marginBottom","16px"),t),travellingDates:Object(ee.a)({marginBottom:"16px"},e.breakpoints.up("lg"),{width:"20%",marginRight:"1.8rem",marginLeft:"1.8rem"}),travellersInformations:Object(ee.a)({},e.breakpoints.up("lg"),{width:"50%"}),sectionTitle:{marginBottom:"16px"},proposedTrips:{marginTop:"20px",width:"100%"},loader:{display:"flex",justifyContent:"center",width:"100%",padding:"30px"}}})(Se),xe={onSearch:n.initSearch},Ie=Object(c.b)(function(e){var t=e.search;return{proposedTrips:t.proposedTrips,isLoading:t.isLoading}},xe)(we),De=function(){var e=Object(h.a)(),t=[e],r=m.applyMiddleware.apply(void 0,t),a=p.composeWithDevTools.apply(void 0,[r]),n=Object(m.createStore)(z,a);return e.run(q),n}();Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ke=document.getElementById("root");null!==ke&&i.a.render(s.a.createElement(function(){return s.a.createElement(c.a,{store:De},s.a.createElement("div",{className:d.a.App},s.a.createElement(Ie,null)))},null),ke),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5605,2,1]]]);
//# sourceMappingURL=main.7cabda41.chunk.js.map