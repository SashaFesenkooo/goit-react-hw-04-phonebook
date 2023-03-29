import React, { useState, useEffect, useRef } from "react";
import { nanoid } from 'nanoid'
import {ContactForm} from "components/contactForm/ContactForm"
import { Filter } from "components/filter/Filter";
import { ContactList } from "components/contactList/ContactList";
import { ContactItem } from "components/contactItem/ContactItem"
import css from "components/App.module.css"

const LS_KEY = "contacts";
const initialArrayOfValues = [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]

export const App = () => {
  const [contacts, setContacts] = useState([...initialArrayOfValues])
  const [filter, setFilter] = useState("")
  const firstRender=useRef(true)

  const contactId = () => { return nanoid(3) }
 
  const addContact = (name, number) => {
    const data = {
      id: contactId(),
      name,
      number,
    }

    if (contacts.find(obj => obj.name === name)) {
      alert(`${name} is already in contacts.`)
      return;
    };
  
    setContacts([data, ...contacts] )
   
  }
  
  const deleteContact = (contactId) => {
    
    setContacts ( ()=> (contacts.filter(contact => contact.id !== contactId)))
  }

  const findContact = evt => {
    const { value } = evt.target
    setFilter(value);
  }

 
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase()
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter))
  }


  useEffect(() => {
    const contactsLS = JSON.parse(localStorage.getItem(LS_KEY))
    if (contactsLS) { setContacts(contactsLS) }
   },[])
  
  useEffect(() => {   
    if (firstRender.current) {
      firstRender.current=false
      return
    }
      localStorage.setItem(LS_KEY, JSON.stringify(contacts))
    } ,[contacts])


  return (
    <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onSubmit={addContact} />
              
        
      <h2 className={css.title}>Contacts</h2>
      <div className={css.smalContainer}>
        <Filter filter={filter} findContact={findContact} />
          
        <ContactList>
          <ContactItem visibleContact={getVisibleContacts()} onDeleteContact={deleteContact} />
        </ContactList>
      </div>
    </div>
  );
};

