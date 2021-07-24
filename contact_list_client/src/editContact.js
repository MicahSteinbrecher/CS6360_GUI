import React from "react";
import './addContact.css';
import {Name} from './name.js';
import {Addresses} from './addresses.js';
import {Numbers} from './numbers.js';
import {Dates} from './dates.js';
import {editContact} from './utilities.js'


export class EditContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: this.props.contact,
        }
    }


    onFNameInput(name){
        let contact = { ...this.state.contact };
        contact.contact.fname = name;

        this.setState({
            contact: contact
        })
    }

    onMNameInput(name){
        let contact = { ...this.state.contact };
        contact.contact.mname = name;

        this.setState({
            contact: contact
        })
    }

    onLNameInput(name){
        let contact = { ...this.state.contact };
        contact.contact.lname = name;

        this.setState({
            contact: contact
        })
    }

    onATypeInput(i, type){
        let contact = { ...this.state.contact };
        contact.addresses[i].address_type = type;

        this.setState({
            contact: contact
        })
    }

    onAddressInput(i, address){
        let contact = { ...this.state.contact };
        contact.addresses[i].address = address;

        this.setState({
            contact: contact
        })
    }

    onCityInput(i, city){
        let contact = { ...this.state.contact };
        contact.addresses[i].city = city;

        this.setState({
            contact: contact
        })
    }

    onStateInput(i, state){
        let contact = { ...this.state.contact };
        contact.addresses[i].state = state;

        this.setState({
            contact: contact
        })
    }

    onZipInput(i, zip){
        let contact = { ...this.state.contact };
        contact.addresses[i].zip = zip;

        this.setState({
            contact: contact
        })
    }

    onPTypeInput(i, type){
        let contact = { ...this.state.contact };
        contact.numbers[i].phone_type = type;

        this.setState({
            contact: contact
        })
    }

    onAreaCodeInput(i, code){
        let contact = { ...this.state.contact };
        contact.numbers[i].area_code = code;

        this.setState({
            contact: contact
        })
    }

    onNumberInput(i, number){
        let contact = { ...this.state.contact };
        contact.numbers[i].number = number;

        this.setState({
            contact: contact
        })
    }

    onDTypeInput(i, type){
        let contact = { ...this.state.contact };
        contact.dates[i].date_type = type;

        this.setState({
            contact: contact
        })
    }

    onDateInput(i, date){
        let contact = { ...this.state.contact };
        contact.dates[i].date = date;

        this.setState({
            contact: contact
        })
    }

    addAddress() {
        let contact = { ...this.state.contact };
        contact.addresses.push({

            address_type: '',
            address: '',
            city: '',
            state: '',
            zip: ''

        });




        this.setState({
            contact: contact
        })
    }

    addNumber() {
        let contact = { ...this.state.contact };
        contact.numbers.push({
            phone_type: '',
            area_code: '',
            number: ''
        });

        this.setState({
            contact: contact
        })
    }

    addDate() {
        let contact = { ...this.state.contact };
        contact.dates.push({
            date_type: '',
            date: ''
        });

        this.setState({
            contact: contact
        })
    }

    handleEditContact() {
        this.props.handleEdit(this.state.contact);
    }


    render() {

        return (
            <div>

                <Name name={this.state.contact.contact}
                      onFNameInput={(name) => this.onFNameInput(name)}
                      onMNameInput={(name) => this.onMNameInput(name)}
                      onLNameInput={(name) => this.onLNameInput(name)}
                />

                <Addresses addresses={this.state.contact.addresses}
                           onATypeInput={(i, type) => this.onATypeInput(i, type)}
                           onAddressInput={(i, address) => this.onAddressInput(i, address)}
                           onCityInput={(i, city) => this.onCityInput(i, city)}
                           onStateInput={(i, state) => this.onStateInput(i, state)}
                           onZipInput={(i, zip) => this.onZipInput(i, zip)}
                           addAddress={()=>this.addAddress()}
                />

                <Numbers numbers = {this.state.contact.numbers}
                         onPTypeInput={(i, type) => this.onPTypeInput(i, type)}
                         onAreaCodeInput={(i, code) => this.onAreaCodeInput(i, code)}
                         onNumberInput={(i, number) => this.onNumberInput(i, number)}
                         addNumber={()=>this.addNumber()}

                />

                <Dates dates = {this.state.contact.dates}
                       onDTypeInput={(i, type) => this.onDTypeInput(i, type)}
                       onDateInput={(i, date) => this.onDateInput(i, date)}
                       addDate={()=>this.addDate()}

                />
                <button type="button" onClick={()=>this.handleEditContact()}>Done</button>
                <button type="button" onClick={()=>this.handleCancel()}>Cancel</button>


            </div>
        );
    }

}
