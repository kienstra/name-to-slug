import { useEffect, useRef, useState } from 'react'
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

  useEffect(() => {
    if (isNew) {
      setSlug(toSlug(name))
      autoSlugged.current = true
    }

    if (isNew && ref.current !== ref.current?.ownerDocument.activeElement) {
      ref.current.select()
    }
  }, [name, isNew])

  function onNameChange(event) {
    event.preventDefault()
    setName(event.target.value)
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
    setIsNew(true)
    autoSlugged.current = false
  }

  function clear() {
    setName('')
    setSlug('')
  }

  function onClear() {
    clear()
    setIsNew(true)
    autoSlugged.current = false
  }

  return (
    <div>
      <label htmlFor="field-name">
        Field name
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
        Field slug
      </label>
      <input
        type="text"
        id="field-slug"
        value={slug}
        onChange={onSlugChange}
      />
      <button onClick={onAdd}>
        Add
      </button>
      <button onClick={onClear}>
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
