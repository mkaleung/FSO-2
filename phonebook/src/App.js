import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to the phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length +  1,
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleChange = (event) => {
    const inputName = event.target.name
    const newValue = event.target.value
    console.log(inputName)
    switch (inputName) {
      case "name":
        setNewName(newValue)
        break
      case "number":
        setNewNumber(newValue)
        break
      case "filter":
        setFilterName(newValue)
        break
      default:
        alert("ERROR IN INPUT")
    }
  }

  const contactsToShow = (filterName) => {
    if (!filterName) {
      return persons
    } else {
      return persons.filter((person) => {
        return person.name.toLowerCase().includes(filterName)
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Input 
        name="filter"
        value={filterName}
        onChange={handleChange}
      />
      <h2>Add New Contact</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        onChange={handleChange}
        onSubmit={addPerson} 
      />
      <h2>Numbers</h2>
      <ul>
        {contactsToShow(filterName).map(person => 
          <Person 
            key={person.name}
            person={person}
          />
        )}
      </ul>
    </div>
  )
}

export default App