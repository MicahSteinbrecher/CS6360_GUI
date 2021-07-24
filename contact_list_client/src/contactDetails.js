import React from "react";
import './contactDetails.css';
import {EditContact} from "./editContact";


export class ContactDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }
    }

    onDeleteContact() {
        this.props.onDeleteContact(this.props.contactDetails.contact_id)
    }

    handleEdit(contact){
        this.props.handleEdit(contact)
        this.setState({
            edit: false
        })
    }


    render() {

        if (this.state.edit){
            return (
                <div className="details">{'Edit Contact'}
                    <EditContact contact={this.props.contactDetails}
                                 handleEdit={(contact)=>this.handleEdit(contact)}


                    />
                </div>
            );
        }

        if (this.props.contactDetails == null) {

            return (
                <div className="details">{'Contact Details'}
                </div>
            );
        }


        else {
            let c = this.props.contactDetails;

            var addresses = c.addresses?.map((a, i)=>{
                return(
                    <li  key={a.address_id}>
                        <span>{a.address_type}{":"} {a.address} {a.city} {a.state} {a.zip}</span>
                    </li>
                )
            });

            var numbers = c.numbers?.map((n, i)=>{
                return(
                    <li  key={n.phone_id}>
                        <span>{n.phone_type}{":"} {n.area_code} {n.number}</span>
                    </li>
                )
            });

            var dates = c.dates?.map((d, i)=>{
                return(
                    <li  key={d.date_id}>
                        <span>{d.date_type}{":"} {d.date}</span>
                    </li>
                )
            });

            return (
                <div className="details"> {'Contact Details'}


                    <div className="header">
                        {c.contact.fname} {c.contact.mname} {c.contact.lname}
                    </div>

                    <text className="title">Address:</text>
                    <ul>
                        {addresses}
                    </ul>

                    <text className="title">Phone:</text>
                    <ul>
                        {numbers}
                    </ul>

                    <text className="title">Calender:</text>
                    <ul>
                        {dates}
                    </ul>
                    <button type="button" onClick={()=>{this.setState({edit: true})}}>Edit Contact</button>
                    <button type="button" onClick={()=>this.props.onDeleteContact(this.props.contactDetails.contact.contact_id)}>Delete Contact</button>

                </div>
            );
        }
    }
}
