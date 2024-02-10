import { useRef, useState } from 'react'
import React from 'react'

function toSlug(x) {
  return x
    ?.toLowerCase()
    .replace( /[^\w ]+/g, '' )
    .replace( / +/g, '-' )
    .replace( /_+/g, '-' )
}

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

    if (ref.current !== ref.current?.ownerDocument.activeElement) {
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

  function onAdd() {
    setFields({
      ...fields,
      [slug]: name,
    })
    clear()
  }

  function clear() {
    setName('')
    setSlug('')
    newField()
  }

  function onNameBlur() {
    if (autoSlugged.current) {
      setIsNew(false)
    }
  }

  return (
    <div>
      <label htmlFor="field-name">
        Name
      </label>
      <input
        ref={ref}
        type="text"
        id="field-name"
        value={name}
        onChange={onNameChange}
        onBlur={onNameBlur}
      />
      <label htmlFor="field-slug">
        Slug
      </label>
      <input
        type="text"
        id="field-slug"
        value={slug}
        onChange={(event) => {
          event.preventDefault()
          setSlug(event.target.value)
        }}
      />
      <button onClick={onAdd}>
        Add
      </button>
      <button onClick={clear}>
        Clear
      </button>
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
