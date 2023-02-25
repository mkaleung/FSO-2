import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

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
    
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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