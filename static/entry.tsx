import * as React from "react"
import * as ReactDOM from "react-dom"
import * as $ from "jquery"
import * as _ from "lodash"

interface Lang{
    Name: string;
    Code: string;

}

interface LabeldProps{
    ID: string;
    label: string
}

class Labeled extends React.Component<LabeldProps, {}>{
    render(){
        let p = this.props
        return(
        <div className="form-group">
            <label htmlFor={p.ID} className="col-sm-2 control-label">{p.label}</label>
            <div className="col-sm-10">
                {this.props.children}
            </div>
        </div>)
    }
}

interface Location{
    id: number;
    name: string;
}

interface  Departure{
    departure_time: string;
    arrival_time: string;
    destination_location_id: number;
    origin_location_id: number;
    prices: {
        total: number;
    }
}

interface ReturnData{
    departures: Departure[];
    locations: Location[];
    complete: boolean;
}

interface BusData{
    returnData ?: ReturnData;
    langs ?: Lang[];
}

class BusBud extends React.Component<{}, BusData>{
    constructor(props: any){
        super(props)
        this.state = {
            returnData:{
                departures:[],
                locations:[],
                complete: false,
            },
            langs: []
        }
    }

    locationById = (id: number) => {
        return _.find(this.state.returnData.locations, (l: Location) => l.id == id)
    }
    render(){
        let data = [
             ["origin", "From", <select className="form-control" id="origin">
                                    <option value="dr5reg">New York</option>
                               </select>]
            ,["destination", "To",  <select className="form-control" id="destination">
                                        <option value="f25dvk">Montréal</option>
                                    </select>]
            ,["outbound_date", "Date", <input type="text" id="outbound_date" className="form-control"/>]
            ,["adults", "Adults", <input type="text" id="adults" className="form-control" defaultValue="1"/>]
            ,["lang", "Language", 
                                    <select className="form-control" id="lang">
                                    {
                                        this.state.langs.map( (lang: Lang, i: number) => 
                                                  <option value={lang.Code} key={i}>{lang.Name}</option>
                                                 )
                                    }
                                    </select>
            ]
            ,["submit", "", <button type="button" className="btn btn-default" onClick={this.handleClick}>Submit</button>]
        ]
        return <div>
        <form className="form-horizontal">
            {data.map( (d:[string, string, any], i: number) => <Labeled ID={d[0]} label={d[1]} key={i}>{d[2]}</Labeled>)}
        </form>

        <table className="table table-striped table-bordered">
            <tbody>
                <tr>
                {'Departure Time,Arrival Time,Origin,Destination,Price'.split(',').map( (s, i) => <th key={i}>{s}</th>)}
                </tr>
                {
                    this.state.returnData.departures.map( (dep: Departure, i: number) => <tr key={i}> 
                        <td>{dep.departure_time}</td>
                        <td>{dep.arrival_time}</td>
                        <td>{this.locationById(dep.origin_location_id).name}</td>
                        <td>{this.locationById(dep.destination_location_id).name}</td>
                        <td>{dep.prices.total}</td>
                    </tr>)
                }
            </tbody>
        </table>
        </div>
    }

    componentDidMount(){
        $('#outbound_date').datepicker({
            dateFormat: 'yy-mm-dd',
            defaultDate: +1
        })
        $.get('lang.json', (data)=>{
            this.setState({ 'langs': data })
        })
    }

    onSuccess = (url: string, params: string, start: number, firstTime: boolean) => 
         (data: ReturnData, textStatus: string, jqXHR: JQueryXHR) => {
            let newState :BusData  = null
             if(firstTime){
                 newState = {returnData: data}
             } else{
                newState = _.cloneDeep(this.state)
                Array.prototype.push.apply(newState.returnData.departures, data.departures)
             }
            if(!data.complete){
                let idx = newState.returnData.departures.length 
                this.setState(newState)
                this.request(url, params, idx, false)
            } else{
                this.setState(newState)
            }
        }

    request =(url: string, params: string, start: number, firstTime: boolean) =>  {
        let settings={
            headers:{
                Accept : 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
            },
            success: this.onSuccess(url, params, start, firstTime),
            error: function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string){
                console.log(textStatus, errorThrown)
            },
            dateType: "json"
        }

        let url1 = firstTime ? url + params : url + '/poll' + params + '&index=' + start
        $.ajax(url1, settings) 
    }

    handleClick = (e: any) => {
        let d: any = {}
        'origin destination outbound_date adults lang'.split(' ').map(
            (id: string, i: number, a: string[])=> d[id]=$('#'+id).val())
        let url = `https://napi.busbud.com/x-departures/${d.origin}/${d.destination}/${d.outbound_date}`
        let params = `?adult=${d.adults}&lang=${d.lang}`
        this.request(url, params, 0, true)
    }
}

ReactDOM.render(
    <BusBud />,
    document.getElementById("react_div")
);

