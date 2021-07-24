import React from "react";
import './addContact.css';
import {Name} from './name.js';
import {Addresses} from './addresses.js';
import {Numbers} from './numbers.js';
import {Dates} from './dates.js';



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
            addresses: contact
        })
    }


    render() {

        return (
            <div> {'Add Contact'}
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
                <Numbers numbers = {this.state.newcontact.numbers} />
                <Dates dates = {this.state.newcontact.dates} />

                <div>
                    {JSON.stringify(this.state.newcontact)}

                </div>
            </div>
        );
    }

}
