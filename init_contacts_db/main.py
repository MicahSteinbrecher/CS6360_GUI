# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
import psycopg2

def start():
    contacts, addresses, phone_numbers, dates = preprocessing()
    conn = psycopg2.connect(
        host="localhost",
        database="contact_list",
        user="contacts",
        password="contacts")
    cur = conn.cursor()

    cur.execute("DELETE FROM address")
    cur.execute("DELETE FROM phone")
    cur.execute("DELETE FROM date")
    cur.execute("DELETE FROM contact")
    
    for c in contacts:
        cur.execute("INSERT INTO contact(contact_id, fname, mname, lname) VALUES (%s, %s,%s,%s)", (c['contact_id'], c['first_name'], c['middle_name'], c['last_name']))
    conn.commit()

    for a in addresses:
        if a['zip'] == '':
            a['zip'] = None
        cur.execute("INSERT INTO address(contact_id, address_type, address, city, state, zip) VALUES (%s, %s, %s, %s, %s, %s)", (a['contact_id'], a['address_type'], a['address'], a['city'], a['state'], a['zip']))

    for p in phone_numbers:
        cur.execute("INSERT INTO phone(contact_id, phone_type, area_code, number) VALUES (%s, %s, %s, %s)", (p['contact_id'], p['phone_type'], p['area_code'], p['number']))

    for d in dates:
        cur.execute("INSERT INTO date(contact_id, date_type, date) VALUES (%s, %s, %s)", (d['contact_id'], d['date_type'], d['date']))


    conn.commit()
    cur.close()
    conn.close()

def preprocessing():
    data = []
    with open('/Users/micah/Desktop/CS6360_GUI/Contacts.csv', 'rt') as f:
        for idx, line in enumerate(f):
            if idx < 2:
                continue
            i = line.rstrip().split(',')
            data.append({
                'contact_id': i[0],
                'first_name': i[1].lower(),
                'middle_name': i[2].lower(),
                'last_name': i[3].lower(),
                'home_phone': i[4],
                'cell_phone': i[5],
                'home_address': i[6].lower(),
                'home_city': i[7].lower(),
                'home_state': i[8].lower(),
                'home_zip': i[9],
                'work_phone': i[10],
                'work_address': i[11].lower(),
                'work_city': i[12].lower(),
                'work_state': i[13].lower(),
                'work_zip': i[14],
                'birth_date': i[15]
            })

    contacts = []
    addresses = []
    phone_numbers = []
    dates = []
    for e in data:
        try:
            contacts.append({
                'contact_id': e['contact_id'],
                'first_name': e['first_name'],
                'middle_name': e['middle_name'],
                'last_name': e['last_name']
            })
        except Exception as error:
            print(error)

        if e['home_address'] != '':
            addresses.append({
                'contact_id': e['contact_id'],
                'address_type': 'home',
                'address': e['home_address'],
                'city': e['home_city'],
                'state': e['home_state'],
                'zip': e['home_zip']
            })

        if e['work_address'] != '':
            addresses.append({
                'contact_id': e['contact_id'],
                'address_type': 'work',
                'address': e['work_address'],
                'city': e['work_city'],
                'state': e['work_state'],
                'zip': e['work_zip']
            })

        if e['home_phone'] != '':
            phone_numbers.append({
                'contact_id': e['contact_id'],
                'phone_type': 'home',
                'area_code': e['home_phone'][0:3],
                'number': e['home_phone'][4:7] + e['home_phone'][8:]
            })

        if e['work_phone'] != '':
            phone_numbers.append({
                'contact_id': e['contact_id'],
                'phone_type': 'work',
                'area_code': e['work_phone'][0:3],
                'number': e['work_phone'][4:7] + e['work_phone'][8:]
            })

        if e['birth_date'] != '':
            dates.append({
                'contact_id': e['contact_id'],
                'date_type': 'birthday',
                'date': e['birth_date']
            })

    return contacts, addresses, phone_numbers, dates

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    start()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
