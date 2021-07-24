import React from "react";
import './forms.css'

export class Dates extends React.Component {

    render() {

        var input = this.props.dates?.map((d, i)=>{
            return(
                <div>
                    <text> Date {i+1}</text>

                    <div className="inputRow">

                        <label htmlFor="date_type">event:</label>
                        <input type="text" size="20" id="date_type" value={d.date_type} onInput={(e) => this.props.onDTypeInput(i, e.target.value)} />

                        <label htmlFor="date">date:</label>
                        <input type="text" size="20" id="date" value={d.date} onInput={(e) => this.props.onDateInput(i, e.target.value)}  />

                    </div>
                </div>
            )
        });

        return (
            <div>
                <h4>Dates </h4>
                {input}
                <button type="button" onClick={()=>this.props.addDate()}>Add Date</button>
            </div>
        );
    }

}
