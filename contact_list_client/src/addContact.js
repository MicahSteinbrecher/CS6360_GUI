import React from "react";
import './addContact.css';
import {Name} from './name.js';
import {Addresses} from './addresses.js';
import {Numbers} from './numbers.js';
import {Dates} from './dates.js';
import {addContact, deleteContact} from './utilities.js'


export class AddContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newcontact: {
                name: {
                    'fname': '',
                    'mname': '',
                    'lname': ''
                },
                addresses: [
                    {
                        address_type: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: ''
                    }
                ],
                numbers: [
                    {
                        phone_type: '',
                        area_code: '',
                        number: ''
                    }
                ],
                dates: [
                    {
                        date_type: '',
                        date: ''
                    }
                ]
            }
        }
    }

    onFNameInput(name){
        let contact = { ...this.state.newcontact };
        contact.name.fname = name;

        this.setState({
            newcontact: contact
        })
    }

    onMNameInput(name){
        let contact = { ...this.state.newcontact };
        contact.name.mname = name;

        this.setState({
            newcontact: contact
        })
    }

    onLNameInput(name){
        let contact = { ...this.state.newcontact };
        contact.name.lname = name;

        this.setState({
            newcontact: contact
        })
    }

    onATypeInput(i, type){
        let contact = { ...this.state.newcontact };
        contact.addresses[i].address_type = type;

        this.setState({
            newcontact: contact
        })
    }

    onAddressInput(i, address){
        let contact = { ...this.state.newcontact };
        contact.addresses[i].address = address;

        this.setState({
            newcontact: contact
        })
    }

    onCityInput(i, city){
        let contact = { ...this.state.newcontact };
        contact.addresses[i].city = city;

        this.setState({
            newcontact: contact
        })
    }

    onStateInput(i, state){
        let contact = { ...this.state.newcontact };
        contact.addresses[i].state = state;

        this.setState({
            newcontact: contact
        })
    }

    onZipInput(i, zip){
        let contact = { ...this.state.newcontact };
        contact.addresses[i].zip = zip;

        this.setState({
            newcontact: contact
        })
    }

    onPTypeInput(i, type){
        let contact = { ...this.state.newcontact };
        contact.numbers[i].phone_type = type;

        this.setState({
            newcontact: contact
        })
    }

    onAreaCodeInput(i, code){
        let contact = { ...this.state.newcontact };
        contact.numbers[i].area_code = code;

        this.setState({
            newcontact: contact
        })
    }

    onNumberInput(i, number){
        let contact = { ...this.state.newcontact };
        contact.numbers[i].number = number;

        this.setState({
            newcontact: contact
        })
    }

    onDTypeInput(i, type){
        let contact = { ...this.state.newcontact };
        contact.dates[i].date_type = type;

        this.setState({
            newcontact: contact
        })
    }

    onDateInput(i, date){
        let contact = { ...this.state.newcontact };
        contact.dates[i].date = date;

        this.setState({
            newcontact: contact
        })
    }

    addAddress() {
        let contact = { ...this.state.newcontact };
        contact.addresses.push({

            address_type: '',
            address: '',
            city: '',
            state: '',
            zip: ''

        });




        this.setState({
            newcontact: contact
        })
    }

    addNumber() {
        let contact = { ...this.state.newcontact };
        contact.numbers.push({
            phone_type: '',
            area_code: '',
            number: ''
        });

        this.setState({
            newcontact: contact
        })
    }

    addDate() {
        let contact = { ...this.state.newcontact };
        contact.dates.push({
            date_type: '',
            date: ''
        });

        this.setState({
            newcontact: contact
        })
    }

    handleAddContact(){
        addContact(this.state.newcontact)
    }


    render() {

        return (
            <div> {'Add Contact'}
                <button type="button" onClick={()=>this.handleAddContact()}>Create New Contact</button>

                <Name name={this.state.newcontact.name}
                      onFNameInput={(name) => this.onFNameInput(name)}
                      onMNameInput={(name) => this.onMNameInput(name)}
                      onLNameInput={(name) => this.onLNameInput(name)}
                />

                <Addresses addresses={this.state.newcontact.addresses}
                           onATypeInput={(i, type) => this.onATypeInput(i, type)}
                           onAddressInput={(i, address) => this.onAddressInput(i, address)}
                           onCityInput={(i, city) => this.onCityInput(i, city)}
                           onStateInput={(i, state) => this.onStateInput(i, state)}
                           onZipInput={(i, zip) => this.onZipInput(i, zip)}
                           addAddress={()=>this.addAddress()}
                />

                <Numbers numbers = {this.state.newcontact.numbers}
                         onPTypeInput={(i, type) => this.onPTypeInput(i, type)}
                         onAreaCodeInput={(i, code) => this.onAreaCodeInput(i, code)}
                         onNumberInput={(i, number) => this.onNumberInput(i, number)}
                         addNumber={()=>this.addNumber()}

                />

                <Dates dates = {this.state.newcontact.dates}
                       onDTypeInput={(i, type) => this.onDTypeInput(i, type)}
                       onDateInput={(i, date) => this.onDateInput(i, date)}
                       addDate={()=>this.addDate()}

                />

            </div>
        );
    }

}
