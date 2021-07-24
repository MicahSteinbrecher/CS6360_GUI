
export async function getContacts() {
    return fetch("http://localhost:3001/getcontacts")
        .then(res => res.json())
        .then(
            (result) => {
                return result.contacts
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error')

            }
        )
}

export async function searchContacts(input) {
    const url = "http://localhost:3001/searchcontacts?input=" + input;
    return fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log('search result: ')
                console.log(result)
                return result.contacts
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error')

            }
        )
}


export async function getContactByID(id) {
    const url = "http://localhost:3001/getContactByID?id=" + id;
    return fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log('search result: ')
                console.log(result)
                return result.contact
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error')

            }
        )
}

export async function addContact(contact) {
    const url = "http://localhost:3001/addContact";
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contact })
    })
        .then(res => res.json())
        .then(
            (result) => {
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error')

            }
        )
}

export async function deleteContact(id) {
    const url = "http://localhost:3001/deleteContact?id=" + id;
    return fetch(url, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error')

            }
        )
}

export async function editContact(contact) {
    const url = "http://localhost:3001/editContact";
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contact })
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error')

            }
        )
}
