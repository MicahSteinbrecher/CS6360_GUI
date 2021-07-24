import React from 'react';
import ReactDOM from 'react-dom';
import {getContacts, searchContacts, getContactByID, deleteContact, editContact} from './utilities';
import './index.css';
import {ContactDetails} from './contactDetails';
import {AddContact} from './addContact';



class Contacts extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSearch(this.state.searchInput)
    }

    handleChange(e) {
        this.setState({
            searchInput: e.target.value
        })
    }

    onContactSelection(id) {
        this.props.onContactSelection(id)
    }

    render() {

        var list = this.props.contacts?.map((c, i)=>{
            return(
                <li className="listLink" key={c.contact_id} onClick={() => this.onContactSelection(c.contact_id)}>
                    <span>{c.fname} {c.mname} {c.lname}</span>
                </li>
            )
        });

        return (

            <div className="contacts">
                {'Contacts'}

                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <label>
                        Search:
                        <input type="text" value={this.state.searchInput} onChange={(e) => this.handleChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <text>{this.state.searchInput}</text>


                <ul>
                    {list}
                </ul>

            </div>

        );
    }
}




class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            contactDetails: null

        }
    }


    async componentDidMount() {
        console.log('component mounted')
        let contacts = await getContacts()

        this.setState({
            contacts: contacts
        })
    }

    async handleSearch(input) {
        let contacts = await searchContacts(input)
        this.setState({
            contacts: contacts
        })

    }

    async handleContactSelection(id) {
        let contactDetails = await getContactByID(id)
        this.setState({
            contactDetails: contactDetails
        })
    }

    async handleDeleteContact(id){
        let res = await deleteContact(id);
        let contacts = [ ...this.state.contacts ];
        let result  = contacts.filter(function (c) {
            return c.contact_id != id ;
        });


        this.setState({
            contactDetails: null,
            contacts: result
        })
    }

    async handleEdit(contact) {
        let res = await editContact(contact)
        this.setState({
            contactDetails: contact
        })
    }

    render() {

        return (
            <container className="container">
                <Contacts
                          onSearch={(input) => this.handleSearch(input)}
                          onContactSelection={(id) => this.handleContactSelection(id)}

                          contacts={this.state.contacts} />
                <div className="col">
                    <ContactDetails contactDetails = {this.state.contactDetails}
                                    onDeleteContact={(id)=>this.handleDeleteContact(id)}
                                    handleEdit={(contact)=>this.handleEdit(contact)}
                    />
                    <AddContact
                    />
                </div>
            </container>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

