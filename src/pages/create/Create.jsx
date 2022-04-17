import { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'

//hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

//firebase
import { Timestamp } from 'firebase/firestore'

//styles
import './Create.css'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'monsters', label: 'Monsters' },
  { value: 'npc', label: "NPC's" }
]

export default function Create() {
  let navigate = useNavigate()
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const { addDocument, response } = useFirestore('projects')
  const [users, setUsers] = useState([])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })

      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async e => {
    e.preventDefault()
    setFormError(null)

    if (!category) return setFormError('Please select a category')
    if (!assignedUsers.length)
      return setFormError('Please assign the project to at least 1 users')

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map(eachUser => {
      return {
        displayName: eachUser.value.displayName,
        photoURL: eachUser.value.photoURL,
        id: eachUser.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(project)

    if (!response.error) {
      navigate('/')
    }
    // const myDocRef = doc(projectFirestore, 'users', user.uid)
    // await setDoc(myDocRef, project)
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            onChange={e => setName(e.target.value)}
            value={name} //two way binding
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            required
            onChange={e => setDetails(e.target.value)}
            value={details} //two way binding
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type="date"
            required
            onChange={e => setDueDate(e.target.value)}
            value={dueDate} //two way binding
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            defaultValue={category}
            onChange={option => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={option => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
