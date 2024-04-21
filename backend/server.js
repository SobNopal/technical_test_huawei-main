const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

let contacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '555-555-5555'
  }
];

// Route to get all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Route to add a new contact
app.post('/contacts', (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Route to update a contact
app.put('/contacts/:id', (req, res) => {
  const contactId = req.params.id;
  const updatedContact = req.body;

  // Find the index of the contact with the given id
  const index = contacts.findIndex(contact => contact.id === parseInt(contactId));

  // If contact with the given id exists, update it
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedContact };
    res.status(200).json({ message: 'Contact updated successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Route to delete a contact
app.delete('/contacts/:id', (req, res) => {
  const contactId = req.params.id;

  // Find the index of the contact with the given id
  const index = contacts.findIndex(contact => contact.id === parseInt(contactId));

  // If contact with the given id exists, delete it
  if (index !== -1) {
    contacts.splice(index, 1);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});


// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});