import React, { useState, useEffect } from 'react';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts'))
      ? JSON.parse(localStorage.getItem('contacts'))
      : [];
  });
  const [filter, setFilter] = useState('');

  function visibleFilter() {
    const normalizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  }

  const addContact = contact => {
    setContacts([contact, ...contacts]);
  };

  const onCotnactClone = name => {
    return contacts.find(contact => contact.name === name);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleEl = visibleFilter();

  return (
    <div className={css.box}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContact} onClone={onCotnactClone} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={setFilter} />
      <ContactsList contactData={visibleEl} onDeletContact={deleteContact} />
    </div>
  );
}
