import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import Person from './components/Person'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
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
      id: persons.length === 0 ? 1 : persons[persons.length-1].id +  1,
    }
    
    phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {  
    let person = persons.find(person => person.id === id).name
    
    if (window.confirm(`Delete ${person}?`)) {
      phonebookService
      .removePerson(id)
      .then(response => { 
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`the person '${person} was already deleted from the server`)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App