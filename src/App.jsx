import { useRef, useState } from 'react'
import React from 'react'

export default function App() {
  const [isNew, setIsNew] = useState(true)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [fields, setFields] = useState([])
  const autoSlugged = useRef(false)
  const ref = useRef()

  function newField() {
    setIsNew(true)
    autoSlugged.current = false

    if (isNew && ref.current !==
      ref.current?.ownerDocument.activeElement) {
      ref.current.select()
    }
  }

  function onNameChange(event) {
    event.preventDefault()
    setName(event.target.value)

    if (isNew) {
      setSlug(toSlug(event.target.value))
      autoSlugged.current = true
    }
  }

  function onSlugChange(event) {
    event.preventDefault()
    setSlug(event.target.value)
  }

  function onNameBlur() {
    if (autoSlugged.current) {
      setIsNew(false)
    }
  }

  function onAdd() {
    setFields({
      ...fields,
      [slug]: name,
    })
    clear()
    newField()
  }

  function clear() {
    setName('')
    setSlug('')
  }

  function onClear() {
    clear()
    newField()
  }

  return (
    <div>
      <h1>Field Editor</h1>
      <div>
        <h2>New Field</h2>
        <input
          ref={ref}
          type="text"
          id="field-name"
          value={name}
          onChange={onNameChange}
          onBlur={onNameBlur}
        />
        <label htmlFor="field-name">
          Field name
        </label>
        <input
          type="text"
          id="field-slug"
          value={slug}
          onChange={onSlugChange}
        />
        <label htmlFor="field-slug">
          Field slug
        </label>
      </div>
      <div className="actions">
        <button onClick={onAdd}>
          Add
        </button>
        <button onClick={onClear}>
          Clear
        </button>
      </div>
      <h2>Fields</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Slug</th>
        </tr>
        {Object.entries(fields).map(([k, v]) => {
          return <tr key={k}>
            <td>{v}</td>
            <td>{k}</td>
          </tr>
        })}
      </table>
    </div>
  )
}

function toSlug(x) {
  return x
    ?.toLowerCase()
    .replace( /[^\w ]+/g, '' )
    .replace( / +/g, '-' )
    .replace( /_+/g, '-' )
}
