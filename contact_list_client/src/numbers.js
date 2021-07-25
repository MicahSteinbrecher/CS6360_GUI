import React from "react";
import './forms.css'

export class Numbers extends React.Component {

    render() {

        var numbers = this.props.numbers?.map((n, i)=>{
            return(
                <div>
                    <text> Number {i+1}</text>

                    <div className="inputRow">
                        <label htmlFor="type">phone type:</label>
                        <input type="text" size="20" id="type" value={n.phone_type} onInput={(e) => this.props.onPTypeInput(i, e.target.value)} />

                        <label htmlFor="area_code">area code:</label>
                        <input type="text" size="20" id="area_code" value={n.area_code} onInput={(e) => this.props.onAreaCodeInput(i, e.target.value)}  />

                        <label htmlFor="number">number:</label>
                        <input type="text" size="20" id="number" value={n.number} onInput={(e) => this.props.onNumberInput(i, e.target.value)}  />

                    </div>
                </div>
            )
        });

        return (
            <div>
                <h4>Numbers </h4>
                {numbers}
                <button type="button" onClick={()=>this.props.addNumber()}>Add Number</button>
            </div>
        );
    }

}
