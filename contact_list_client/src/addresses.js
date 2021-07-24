import React from "react";
import './forms.css'

export class Addresses extends React.Component {

    render() {

        var input = this.props.addresses?.map((a, i)=>{
            return(
                <div>
                    <text> Address {i+1}</text>
                    <div className="inputRow">
                        <label htmlFor="type">address type:</label>
                        <input type="text" size="20" id="type" value={a.address_type} onInput={(e) => this.props.onATypeInput(i, e.target.value)} />
                        <label htmlFor="address">address:</label>
                        <input type="text" size="20" id="address" value={a.address} onInput={(e) => this.props.onAddressInput(i, e.target.value)}  />
                        <label htmlFor="city">city:</label>
                        <input type="text" size="20" id="city" value={a.city} onInput={(e) => this.props.onCityInput(i, e.target.value)}  />
                    </div>
                    <div className="inputRow">
                        <label htmlFor="state">state:</label>
                        <input type="text" size="20" id="state" value={a.state} onInput={(e) => this.props.onStateInput(i, e.target.value)}  />
                        <label htmlFor="zip">zip code:</label>
                        <input type="text" size="20" id="zip" value={a.zip} onInput={(e) => this.props.onZipInput(i, e.target.value)}  />
                    </div>
                </div>
            )
        });

        return (
            <div>
                <h4>Addresses </h4>
                {input}
                <button type="button" onClick={()=>this.props.addAddress()}>Add Address</button>
            </div>
        );
    }

}
