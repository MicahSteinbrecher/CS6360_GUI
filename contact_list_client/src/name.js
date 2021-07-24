import React from "react";
import './forms.css'

export class Name extends React.Component {

    render() {

        return (
            <div>
                <h4>Name </h4>
                <label htmlFor="fname">first name:</label>
                <input type="text" size="20" id="fname" className='input' value={this.props.name.fname} onInput={(e) => this.props.onFNameInput(e.target.value)} />
                <label htmlFor="mname">middle name:</label>
                <input type="text" size="20" id="mname" className='input' value={this.props.name.mname} onInput={(e) => this.props.onMNameInput(e.target.value)}  />
                <label htmlFor="lname">last name:</label>
                <input type="text" size="20" id="lname" className='input' value={this.props.name.lname} onInput={(e) => this.props.onLNameInput(e.target.value)}  />
            </div>
        );
    }

}
